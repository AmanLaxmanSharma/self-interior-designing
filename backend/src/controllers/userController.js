const User = require('../models/User');
const { getDBStatus } = require('../config/db');

let memoryUsers = [
  {
    _id: 'user_dev_1',
    name: 'Siddharth Roy',
    email: 'siddharth@gmail.com',
    phone: '9876500112',
    role: 'USER',
    createdAt: new Date()
  }
];

// @desc Get all users (Admin)
// @route GET /api/users
exports.getUsers = async (req, res) => {
  try {
    if (!getDBStatus()) {
      return res.status(200).json({ success: true, count: memoryUsers.length, data: memoryUsers });
    }

    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Get user profile by ID
// @route GET /api/users/:id
exports.getUserById = async (req, res) => {
  try {
    if (!getDBStatus()) {
      const user = memoryUsers.find(u => u._id === req.params.id);
      if (!user) return res.status(404).json({ success: false, error: 'User not found' });
      return res.status(200).json({ success: true, data: user });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Update user profile
// @route PUT /api/users/:id
exports.updateUser = async (req, res) => {
  try {
    const { name, phone } = req.body;

    if (!getDBStatus()) {
      const user = memoryUsers.find(u => u._id === req.params.id);
      if (!user) return res.status(404).json({ success: false, error: 'User not found' });
      if (name) user.name = name;
      if (phone) user.phone = phone;
      return res.status(200).json({ success: true, data: user });
    }

    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    user = await User.findByIdAndUpdate(req.params.id, { name, phone }, { new: true, runValidators: true });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Delete user (Admin)
// @route DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
  try {
    if (!getDBStatus()) {
      memoryUsers = memoryUsers.filter(u => u._id !== req.params.id);
      return res.status(200).json({ success: true, data: {} });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    await user.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
