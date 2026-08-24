const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required']
  },
  title: {
    type: String,
    trim: true,
    default: 'Interior Design Showcase'
  },
  category: {
    type: String,
    default: 'General'
  },
  type: {
    type: String,
    enum: ['Project', 'Inspiration'],
    default: 'Inspiration'
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  alt: {
    type: String,
    default: 'Karoli Interior Hub Design'
  },
  order: {
    type: Number,
    default: 0
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

module.exports = mongoose.model('Gallery', GallerySchema);
