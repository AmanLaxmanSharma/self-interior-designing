const Project = require('../models/Project');
const { getDBStatus } = require('../config/db');

// Sample default portfolio projects derived from visual characteristics in PDFs
const defaultProjects = [
  {
    _id: 'proj_1',
    title: 'Modern Geometric PVC Ceiling & Ambient Lighting',
    slug: 'modern-geometric-pvc-ceiling-ambient-lighting',
    category: 'False Ceiling',
    description: 'Custom dual-layer PVC false ceiling featuring warm LED cove lighting, dark wood contrast panels, and integrated ceiling fan mounting. Crafted for contemporary living spaces.',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    tags: ['False Ceiling', 'PVC Panel', 'LED Lighting', 'Wood Finish'],
    materialsUsed: ['High-Grade PVC Panels', 'Warm White LED Strip', 'Teak Wood Finish Profile'],
    location: 'Residential Residence, Lucknow',
    completionDate: 'June 2026',
    featured: true,
    published: true,
    createdAt: new Date()
  },
  {
    _id: 'proj_2',
    title: 'Luxury White Wall Moulding & Fluted Paneling',
    slug: 'luxury-white-wall-moulding-fluted-paneling',
    category: 'Wall Panel',
    description: 'Sophisticated French-inspired wall moulding composition paired with vertical fluted panels and warm brass sconce wall lights. Created for executive living areas.',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    tags: ['Wall Moulding', 'Wainscoting', 'Brass Accent', 'Warm Ivory'],
    materialsUsed: ['HDMR Moulding Beading', 'PU Matte Polish Paint', 'Architectural Brass Sconces'],
    location: 'Penthouse Villa, Kanpur',
    completionDate: 'May 2026',
    featured: true,
    published: true,
    createdAt: new Date()
  },
  {
    _id: 'proj_3',
    title: 'Contemporary TV Wall Unit with Charcoal & Marble Accent',
    slug: 'contemporary-tv-wall-unit-charcoal-marble-accent',
    category: 'TV Unit',
    description: 'Integrated entertainment wall featuring fluted charcoal PVC paneling, backlit marble veneer backdrop, and floating storage cabinets with hidden LED strips.',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    tags: ['TV Wall', 'Marble Finish', 'Fluted Panel', 'LED Backlight'],
    materialsUsed: ['UV Marble Sheet', 'Charcoal Louvers', 'Soft-close Drawer Hardware'],
    location: 'Modern Apartment, Prayagraj',
    completionDate: 'April 2026',
    featured: true,
    published: true,
    createdAt: new Date()
  },
  {
    _id: 'proj_4',
    title: 'Opulent Bedroom Ceiling Design with RGB Backlit Details',
    slug: 'opulent-bedroom-ceiling-design-rgb-backlit-details',
    category: 'Bedroom',
    description: 'Master bedroom suite incorporating layered PVC ceiling work, subtle cobalt blue LED strip illumination, and warm timber-patterned perimeter paneling.',
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c5172?auto=format&fit=crop&w=1200&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1540518614846-7ede433c5172?auto=format&fit=crop&w=800&q=80',
    tags: ['Bedroom', 'PVC Ceiling', 'Ambient Lighting', 'Wood Texture'],
    materialsUsed: ['Fire-Resistant PVC Ceiling', 'Smart RGB+Warm LED Controllers'],
    location: 'Luxury Flat, Varanasi',
    completionDate: 'March 2026',
    featured: false,
    published: true,
    createdAt: new Date()
  },
  {
    _id: 'proj_5',
    title: 'Executive Commercial Office Panel Work & Drop Ceiling',
    slug: 'executive-commercial-office-panel-work-drop-ceiling',
    category: 'Commercial',
    description: 'Complete corporate office interior execution with sound-dampening wall paneling, linear LED lighting, and polished wood-toned ceiling perimeter.',
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    tags: ['Commercial', 'Office Ceiling', 'Acoustic Panel', 'Linear Light'],
    materialsUsed: ['Commercial Grade PVC Panels', 'Acoustic Backing Board', 'Aluminum Profiles'],
    location: 'Corporate Hub, Lucknow',
    completionDate: 'July 2026',
    featured: false,
    published: true,
    createdAt: new Date()
  }
];

let memoryProjects = [...defaultProjects];

// @desc Get projects with filters
// @route GET /api/projects
exports.getProjects = async (req, res) => {
  try {
    const { category, search, featured } = req.query;

    if (!getDBStatus()) {
      let filtered = memoryProjects.filter(p => p.published);
      if (category && category !== 'All') {
        filtered = filtered.filter(p => p.category === category);
      }
      if (featured === 'true') {
        filtered = filtered.filter(p => p.featured);
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      return res.status(200).json({ success: true, count: filtered.length, data: filtered });
    }

    let query = { published: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Get single project by ID or Slug
// @route GET /api/projects/:id
exports.getProjectById = async (req, res) => {
  try {
    const param = req.params.id;

    if (!getDBStatus()) {
      const project = memoryProjects.find(p => p._id === param || p.slug === param);
      if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
      return res.status(200).json({ success: true, data: project });
    }

    let project = await Project.findById(param).catch(() => null);
    if (!project) {
      project = await Project.findOne({ slug: param });
    }

    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Create project (Admin)
// @route POST /api/projects
exports.createProject = async (req, res) => {
  try {
    const { title, category, description, images, thumbnail, tags, materialsUsed, location, completionDate, featured, published } = req.body;

    if (!title || !category || !description) {
      return res.status(400).json({ success: false, error: 'Title, category, and description are required' });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now();

    if (!getDBStatus()) {
      const newProj = {
        _id: 'proj_' + Date.now(),
        title,
        slug,
        category,
        description,
        images: images || [],
        thumbnail: thumbnail || (images && images[0]) || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        tags: tags || [],
        materialsUsed: materialsUsed || [],
        location: location || 'India',
        completionDate: completionDate || '2026',
        featured: featured || false,
        published: published !== undefined ? published : true,
        createdAt: new Date()
      };
      memoryProjects.unshift(newProj);
      return res.status(201).json({ success: true, data: newProj });
    }

    const project = await Project.create({
      title,
      slug,
      category,
      description,
      images: images || [],
      thumbnail: thumbnail || (images && images[0]),
      tags: tags || [],
      materialsUsed: materialsUsed || [],
      location,
      completionDate,
      featured,
      published
    });

    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Update project (Admin)
// @route PUT /api/projects/:id
exports.updateProject = async (req, res) => {
  try {
    if (!getDBStatus()) {
      const idx = memoryProjects.findIndex(p => p._id === req.params.id);
      if (idx === -1) return res.status(404).json({ success: false, error: 'Project not found' });
      memoryProjects[idx] = { ...memoryProjects[idx], ...req.body };
      return res.status(200).json({ success: true, data: memoryProjects[idx] });
    }

    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Delete project (Admin)
// @route DELETE /api/projects/:id
exports.deleteProject = async (req, res) => {
  try {
    if (!getDBStatus()) {
      memoryProjects = memoryProjects.filter(p => p._id !== req.params.id);
      return res.status(200).json({ success: true, data: {} });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    await project.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
