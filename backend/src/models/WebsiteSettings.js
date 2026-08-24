const mongoose = require('mongoose');

const WebsiteSettingsSchema = new mongoose.Schema({
  companyName: {
    type: String,
    default: 'Karoli Interior Hub'
  },
  phones: [{
    type: String
  }],
  email: {
    type: String,
    default: 'Primepvcpannal@gmail.com'
  },
  whatsapp: {
    type: String,
    default: '917347733581'
  },
  address: {
    type: String,
    default: 'Karoli Interior Hub, Premier Paneling & False Ceiling Studio, India'
  },
  hero: {
    title: { type: String, default: 'Transform Your Space Into Something Extraordinary' },
    subtitle: { type: String, default: 'Premium interior design, false ceiling, PVC panel and wall design solutions crafted for modern spaces.' },
    ctaText: { type: String, default: 'Get Free Consultation' }
  },
  popupSettings: {
    delaySeconds: { type: Number, default: 5 },
    enabled: { type: Boolean, default: true }
  },
  socialLinks: {
    facebook: { type: String, default: '#' },
    instagram: { type: String, default: '#' },
    youtube: { type: String, default: '#' },
    linkedin: { type: String, default: '#' }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('WebsiteSettings', WebsiteSettingsSchema);
