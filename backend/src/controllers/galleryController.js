const Gallery = require('../models/Gallery');
const { getDBStatus } = require('../config/db');

const defaultGallery = [
  {
    _id: 'gal_1',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    title: 'Dual Layer PVC False Ceiling with Cobalt Blue Cove Illumination',
    category: 'False Ceiling',
    type: 'Project',
    alt: 'PVC ceiling work with LED lighting',
    order: 1,
    published: true
  },
  {
    _id: 'gal_2',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    title: 'Neoclassical White Wall Moulding & Brass Sconces',
    category: 'Wall Design',
    type: 'Inspiration',
    alt: 'Classic white wall moulding panels',
    order: 2,
    published: true
  },
  {
    _id: 'gal_3',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
    title: 'Minimalist Warm Neutral Living Room Interior Composition',
    category: 'Living Room',
    type: 'Inspiration',
    alt: 'Luxury minimalist interior living room',
    order: 3,
    published: true
  },
  {
    _id: 'gal_4',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
    title: 'Louvered Fluted Wall Panel & TV Unit Backlight',
    category: 'TV Unit',
    type: 'Project',
    alt: 'Modern TV wall unit paneling design',
    order: 4,
    published: true
  },
  {
    _id: 'gal_5',
    imageUrl: 'https://images.unsplash.com/photo-1540518614846-7ede433c5172?auto=format&fit=crop&w=1000&q=80',
    title: 'Geometric Wood Grain Ceiling Panel with Integrated Fan',
    category: 'PVC Ceiling',
    type: 'Project',
    alt: 'Wood finish ceiling design',
    order: 5,
    published: true
  },
  {
    _id: 'gal_6',
    imageUrl: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1000&q=80',
    title: 'Serene Beige Bedroom Suite with Recessed Ceiling Strip',
    category: 'Bedroom',
    type: 'Inspiration',
    alt: 'Luxury bedroom with cove lighting',
    order: 6,
    published: true
  }
];

let memoryGallery = [...defaultGallery];

// @desc Get gallery items
// @route GET /api/gallery
exports.getGallery = async (req, res) => {
  try {
    const { category, type } = req.query;

    if (!getDBStatus()) {
      let filtered = memoryGallery.filter(g => g.published);
      if (category && category !== 'All') {
        filtered = filtered.filter(g => g.category === category);
      }
      if (type) {
        filtered = filtered.filter(g => g.type === type);
      }
      return res.status(200).json({ success: true, count: filtered.length, data: filtered });
    }

    let query = { published: true };
    if (category && category !== 'All') query.category = category;
    if (type) query.type = type;

    const gallery = await Gallery.find(query).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: gallery.length, data: gallery });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Add image to gallery (Admin)
// @route POST /api/gallery
exports.addGalleryImage = async (req, res) => {
  try {
    const { imageUrl, title, category, type, alt, order } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ success: false, error: 'Image URL is required' });
    }

    if (!getDBStatus()) {
      const newItem = {
        _id: 'gal_' + Date.now(),
        imageUrl,
        title: title || 'Interior Showcase',
        category: category || 'General',
        type: type || 'Inspiration',
        alt: alt || 'Karoli Interior Hub Design',
        order: order || memoryGallery.length + 1,
        published: true,
        createdAt: new Date()
      };
      memoryGallery.unshift(newItem);
      return res.status(201).json({ success: true, data: newItem });
    }

    const item = await Gallery.create({
      imageUrl,
      title,
      category,
      type,
      alt,
      order
    });

    res.status(201).json({ success: true, data: item });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Delete image from gallery (Admin)
// @route DELETE /api/gallery/:id
exports.deleteGalleryImage = async (req, res) => {
  try {
    if (!getDBStatus()) {
      memoryGallery = memoryGallery.filter(g => g._id !== req.params.id);
      return res.status(200).json({ success: true, data: {} });
    }

    const item = await Gallery.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: 'Gallery item not found' });
    }

    await item.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
