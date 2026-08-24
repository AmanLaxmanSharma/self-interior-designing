const mongoose = require('mongoose');

const Model3DSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '3D model name is required'],
    trim: true
  },
  description: {
    type: String
  },
  modelUrl: {
    type: String,
    required: [true, 'Model GLB/GLTF URL is required']
  },
  thumbnail: {
    type: String
  },
  category: {
    type: String,
    default: 'Living Room'
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

module.exports = mongoose.model('Model3D', Model3DSchema);
