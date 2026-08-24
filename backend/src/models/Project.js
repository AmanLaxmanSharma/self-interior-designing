const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Living Room',
      'Bedroom',
      'False Ceiling',
      'PVC Panel',
      'Wall Panel',
      'TV Unit',
      'Lighting',
      'Commercial',
      'Full Interior'
    ]
  },
  description: {
    type: String,
    required: [true, 'Project description is required']
  },
  images: [{
    type: String
  }],
  thumbnail: {
    type: String
  },
  tags: [{
    type: String
  }],
  materialsUsed: [{
    type: String
  }],
  location: {
    type: String,
    default: 'India'
  },
  completionDate: {
    type: String,
    default: '2026'
  },
  featured: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
