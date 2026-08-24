const Model3D = require('../models/Model3D');
const { getDBStatus } = require('../config/db');

const defaultModels = [
  {
    _id: 'm3d_1',
    name: 'Luxury Executive Living Room 3D Concept',
    description: 'Interactive 3D procedural room scene featuring customizable PVC ceiling panels, recessed warm LED cove strips, wainscoting wall mouldings, and floor marble finishes.',
    modelUrl: '/models/procedural_living_room.glb',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    category: 'Living Room',
    published: true,
    createdAt: new Date()
  },
  {
    _id: 'm3d_2',
    name: 'Master Suite Bedroom PVC Ceiling Studio',
    description: '3D bedroom model setup for testing geometric PVC ceiling patterns, warm LED backlights, and timber panel headboards.',
    modelUrl: '/models/procedural_bedroom.glb',
    thumbnail: 'https://images.unsplash.com/photo-1540518614846-7ede433c5172?auto=format&fit=crop&w=600&q=80',
    category: 'Bedroom',
    published: true,
    createdAt: new Date()
  }
];

let memoryModels = [...defaultModels];

// @desc Get all 3D models
// @route GET /api/models
exports.getModels = async (req, res) => {
  try {
    if (!getDBStatus()) {
      const publishedOnly = memoryModels.filter(m => m.published);
      return res.status(200).json({ success: true, count: publishedOnly.length, data: publishedOnly });
    }

    const models = await Model3D.find({ published: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: models.length, data: models });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Get single model
// @route GET /api/models/:id
exports.getModelById = async (req, res) => {
  try {
    if (!getDBStatus()) {
      const model = memoryModels.find(m => m._id === req.params.id);
      if (!model) return res.status(404).json({ success: false, error: '3D Model not found' });
      return res.status(200).json({ success: true, data: model });
    }

    const model = await Model3D.findById(req.params.id);
    if (!model) {
      return res.status(404).json({ success: false, error: '3D Model not found' });
    }

    res.status(200).json({ success: true, data: model });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Create 3D Model (Admin)
// @route POST /api/models
exports.createModel = async (req, res) => {
  try {
    const { name, description, modelUrl, thumbnail, category, published } = req.body;

    if (!name || !modelUrl) {
      return res.status(400).json({ success: false, error: 'Model name and modelUrl are required' });
    }

    if (!getDBStatus()) {
      const newModel = {
        _id: 'm3d_' + Date.now(),
        name,
        description: description || '',
        modelUrl,
        thumbnail: thumbnail || '',
        category: category || 'Living Room',
        published: published !== undefined ? published : true,
        createdAt: new Date()
      };
      memoryModels.unshift(newModel);
      return res.status(201).json({ success: true, data: newModel });
    }

    const model = await Model3D.create({
      name,
      description,
      modelUrl,
      thumbnail,
      category,
      published
    });

    res.status(201).json({ success: true, data: model });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Delete 3D Model (Admin)
// @route DELETE /api/models/:id
exports.deleteModel = async (req, res) => {
  try {
    if (!getDBStatus()) {
      memoryModels = memoryModels.filter(m => m._id !== req.params.id);
      return res.status(200).json({ success: true, data: {} });
    }

    const model = await Model3D.findById(req.params.id);
    if (!model) {
      return res.status(404).json({ success: false, error: '3D Model not found' });
    }

    await model.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
