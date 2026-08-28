const express = require('express');
const { register, login, getMe, logout, sendOtp, verifyOtp } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/logout', logout);

module.exports = router;
