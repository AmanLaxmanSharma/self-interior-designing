const WebsiteSettings = require('../models/WebsiteSettings');
const { getDBStatus } = require('../config/db');

const defaultSettings = {
  companyName: 'Karoli Interior Hub',
  phones: ['7347733581', '8808111000'],
  email: 'Primepvcpannal@gmail.com',
  whatsapp: '917347733581',
  address: 'Karoli Interior Hub, Premier Paneling & False Ceiling Studio, India',
  hero: {
    title: 'Transform Your Space Into Something Extraordinary',
    subtitle: 'Premium interior design, false ceiling, PVC panel and wall design solutions crafted for modern homes and spaces.',
    ctaText: 'Get Free Consultation'
  },
  popupSettings: {
    delaySeconds: 5,
    enabled: true
  },
  socialLinks: {
    facebook: '#',
    instagram: '#',
    youtube: '#',
    linkedin: '#'
  }
};

let memorySettings = { ...defaultSettings };

// @desc Get website settings
// @route GET /api/settings
exports.getSettings = async (req, res) => {
  try {
    if (!getDBStatus()) {
      return res.status(200).json({ success: true, data: memorySettings });
    }

    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create(defaultSettings);
    }

    res.status(200).json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Update website settings (Admin)
// @route PUT /api/settings
exports.updateSettings = async (req, res) => {
  try {
    if (!getDBStatus()) {
      memorySettings = { ...memorySettings, ...req.body };
      return res.status(200).json({ success: true, data: memorySettings });
    }

    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create(req.body);
    } else {
      settings = await WebsiteSettings.findOneAndUpdate({}, req.body, {
        new: true,
        runValidators: true
      });
    }

    res.status(200).json({ success: true, data: settings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
