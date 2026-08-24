const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'karoli_super_secret_jwt_key_2026_interior_hub');

    req.user = await User.findById(decoded.id);

    // Fallback if DB is disconnected but valid dev admin token passed
    if (!req.user && decoded.role === 'ADMIN') {
      req.user = {
        _id: decoded.id,
        name: 'Karoli Admin',
        email: decoded.email || 'admin@karoliinterior.com',
        role: 'ADMIN'
      };
    }

    if (!req.user) {
      return res.status(401).json({ success: false, error: 'User account no longer exists' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }
};

// Grant access to specific roles (e.g., ADMIN)
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: `User role '${req.user.role}' is not authorized to access this route. Admin access required.`
      });
    }
    next();
  };
};
