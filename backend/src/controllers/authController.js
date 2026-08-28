const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Otp = require('../models/Otp');
const { getDBStatus } = require('../config/db');
const { sendOtpEmail } = require('../config/emailService');

// Helper token generator
const sendTokenResponse = (user, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET || 'karoli_super_secret_jwt_key_2026_interior_hub',
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    }
  });
};

// In-memory OTP storage fallback when DB is disconnected
const inMemoryOtpStore = new Map();

// @desc Send OTP for email verification
// @route POST /api/auth/send-otp
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Please provide an email address' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address' });
    }

    if (getDBStatus()) {
      const userExists = await User.findOne({ email: trimmedEmail });
      if (userExists) {
        return res.status(400).json({ success: false, error: 'An account with this email already exists. Please sign in.' });
      }
    }

    // Generate 6-digit random code
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    if (getDBStatus()) {
      // Remove any existing unverified OTPs for this email and create fresh
      await Otp.deleteMany({ email: trimmedEmail });
      await Otp.create({
        email: trimmedEmail,
        otp,
        isVerified: false,
      });
    } else {
      inMemoryOtpStore.set(trimmedEmail, {
        otp,
        isVerified: false,
        expiresAt: Date.now() + 10 * 60 * 1000,
      });
    }

    // Send email
    await sendOtpEmail(trimmedEmail, otp);

    res.status(200).json({
      success: true,
      message: `A 6-digit verification code has been sent to ${trimmedEmail}`,
    });
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ success: false, error: 'Failed to send verification code. ' + err.message });
  }
};

// @desc Verify OTP code
// @route POST /api/auth/verify-otp
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, error: 'Please provide email and verification code' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedOtp = otp.toString().trim();

    if (getDBStatus()) {
      const otpRecord = await Otp.findOne({ email: trimmedEmail, otp: trimmedOtp });
      if (!otpRecord) {
        return res.status(400).json({ success: false, error: 'Invalid or expired verification code' });
      }

      otpRecord.isVerified = true;
      await otpRecord.save();
    } else {
      const record = inMemoryOtpStore.get(trimmedEmail);
      if (!record || record.otp !== trimmedOtp || Date.now() > record.expiresAt) {
        return res.status(400).json({ success: false, error: 'Invalid or expired verification code' });
      }
      record.isVerified = true;
    }

    res.status(200).json({
      success: true,
      message: 'Email verified successfully!',
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Register user
// @route POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide name, email, and password' });
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Check if email was verified with OTP
    if (getDBStatus()) {
      const verifiedOtp = await Otp.findOne({ email: trimmedEmail, isVerified: true });
      if (!verifiedOtp) {
        return res.status(400).json({
          success: false,
          error: 'Please verify your email address with the OTP before creating an account.',
        });
      }

      const userExists = await User.findOne({ email: trimmedEmail });
      if (userExists) {
        return res.status(400).json({ success: false, error: 'User with this email already exists' });
      }

      const user = await User.create({
        name,
        email: trimmedEmail,
        phone,
        password,
        role: 'USER'
      });

      // Cleanup verified OTP record
      await Otp.deleteMany({ email: trimmedEmail });

      sendTokenResponse(user, 201, res);
    } else {
      const record = inMemoryOtpStore.get(trimmedEmail);
      if (!record || !record.isVerified) {
        return res.status(400).json({
          success: false,
          error: 'Please verify your email address with the OTP before creating an account.',
        });
      }

      const fakeUser = {
        _id: 'dev_user_' + Date.now(),
        name,
        email: trimmedEmail,
        phone: phone || '',
        role: 'USER'
      };
      inMemoryOtpStore.delete(trimmedEmail);
      return sendTokenResponse(fakeUser, 201, res);
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Login user/admin
// @route POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }

    // Check for hardcoded env admin login fallback if DB disconnected or specific credentials
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@karoliinterior.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@password123';

    if (email.toLowerCase() === adminEmail.toLowerCase() && password === adminPassword) {
      const adminUser = {
        _id: 'admin_master_id_2026',
        name: 'Karoli Admin',
        email: adminEmail,
        phone: '7347733581',
        role: 'ADMIN'
      };
      return sendTokenResponse(adminUser, 200, res);
    }

    if (!getDBStatus()) {
      return res.status(401).json({ success: false, error: 'Invalid credentials. (DB Disconnected)' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Get current logged in user
// @route GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Logout user
// @route POST /api/auth/logout
exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {}
  });
};
