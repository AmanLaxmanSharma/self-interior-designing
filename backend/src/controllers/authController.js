const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getDBStatus } = require('../config/db');

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

// @desc Register user
// @route POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide name, email, and password' });
    }

    if (!getDBStatus()) {
      // In-memory fallback
      const fakeUser = {
        _id: 'dev_user_' + Date.now(),
        name,
        email,
        phone: phone || '',
        role: 'USER'
      };
      return sendTokenResponse(fakeUser, 201, res);
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, error: 'User with this email already exists' });
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: 'USER'
    });

    sendTokenResponse(user, 201, res);
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
