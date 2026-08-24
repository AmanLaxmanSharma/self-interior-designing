const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    trim: true,
    lowercase: true
  },
  city: {
    type: String,
    default: 'Not Specified',
    trim: true
  },
  projectType: {
    type: String,
    enum: [
      'Full Home Interior',
      'Living Room',
      'Bedroom',
      'Kitchen',
      'False Ceiling',
      'PVC Panel',
      'Wall Paneling',
      'TV Unit',
      'Commercial Interior',
      'Renovation',
      'Other'
    ],
    default: 'Full Home Interior'
  },
  budget: {
    type: String,
    default: 'Flexible'
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Follow-up', 'Qualified', 'Converted', 'Closed'],
    default: 'New'
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lead', LeadSchema);
