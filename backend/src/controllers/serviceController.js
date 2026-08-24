const Service = require('../models/Service');
const { getDBStatus } = require('../config/db');

const defaultServices = [
  {
    _id: 'srv_1',
    title: 'Interior Design',
    slug: 'interior-design',
    description: 'Complete customized interior architecture solutions tailored for modern Indian residences.',
    longDescription: 'Our end-to-end interior design service crafts cohesive, elegant living spaces. From spatial planning and 3D visualization to material selection and precision execution, Karoli Interior Hub transforms your house into a luxury home.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    features: ['3D Space Visualization', 'Customized Layout Planning', 'Turnkey Interior Execution', 'Premium Materials'],
    order: 1,
    published: true
  },
  {
    _id: 'srv_2',
    title: 'False Ceiling Design',
    slug: 'false-ceiling-design',
    description: 'Contemporary POP, PVC, and wood-finish ceiling concepts featuring integrated LED strip lighting.',
    longDescription: 'Upgrade your room aesthetic with modern false ceilings. We specialize in geometric ceiling patterns, wooden texture rafter beams, perimeter cove lighting, and blue/warm RGB LED strips.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    features: ['Perimeter Cove Lighting', 'Wood Finish PVC Beams', 'Geometric Pattern Designs', 'RGB Accent Options'],
    order: 2,
    published: true
  },
  {
    _id: 'srv_3',
    title: 'PVC Panel Work',
    slug: 'pvc-panel-work',
    description: 'Durable, waterproof, and aesthetically rich PVC paneling for walls and ceilings.',
    longDescription: 'High-grade PVC wall and ceiling paneling solutions that offer termite resistance, easy maintenance, and striking visual depth with marble and timber texture finishes.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    features: ['100% Waterproof & Termite-Proof', 'Seamless Interlocking Installation', 'Wood & Marble Textures', 'Low Maintenance'],
    order: 3,
    published: true
  },
  {
    _id: 'srv_4',
    title: 'Wall Paneling & Moulding',
    slug: 'wall-paneling-moulding',
    description: 'Decorative moulding, fluted louver panels, textured feature walls, and accent beading.',
    longDescription: 'Add architectural grandeur with classical French wall moulding and modern fluted wall panels. Perfect for living room backdrops, dining walls, and hallways.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    features: ['Classical French Moulding', 'Acoustic Fluted Panels', 'Brass Sconce Lighting Accent', 'Custom Color PU Polish'],
    order: 4,
    published: true
  },
  {
    _id: 'srv_5',
    title: 'TV Unit Design',
    slug: 'tv-unit-design',
    description: 'Modern entertainment TV walls with backlighting, marble veneer, and concealed storage.',
    longDescription: 'Create a centerpiece for your living room with custom TV units designed with floating console cabinets, louvered background panels, and ambient backlighting.',
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=800&q=80',
    features: ['Backlit Marble Backdrop', 'Floating Storage Units', 'Concealed Cable Routing', 'Custom Dimensions'],
    order: 5,
    published: true
  },
  {
    _id: 'srv_6',
    title: 'Bedroom Interiors',
    slug: 'bedroom-interiors',
    description: 'Tranquil, luxurious, and functional master & guest bedroom concepts.',
    longDescription: 'Designing bedrooms that blend cozy comfort with refined sophistication—featuring customized headboards, wardrobe integration, and relaxing warm lighting schemes.',
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c5172?auto=format&fit=crop&w=800&q=80',
    features: ['Upholstered Headboard Walls', 'Modular Wardrobe Integration', 'Warm Mood Lighting', 'Ergonomic Layout'],
    order: 6,
    published: true
  },
  {
    _id: 'srv_7',
    title: 'Living Room Interiors',
    slug: 'living-room-interiors',
    description: 'Spacious, warm, and inviting living spaces engineered for comfort and entertaining.',
    longDescription: 'Transform your main living area into an editorial masterpiece using curated color palettes (Warm Ivory, Beige, Olive accents), plush seating, and architectural lighting.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    features: ['Open-Plan Layouts', 'Statement Lighting Fixtures', 'Coordinated Color Schemes', 'Premium Furniture Selection'],
    order: 7,
    published: true
  },
  {
    _id: 'srv_8',
    title: 'Lighting Design',
    slug: 'lighting-design',
    description: 'Ambient, accent, and decorative lighting integration for dramatic architectural depth.',
    longDescription: 'Light transforms spaces. We design multi-layered lighting schemes combining recessed spotlights, cove LED strips, warm pendant lights, and smart RGB accents.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    features: ['Multi-Layered Lighting', 'Smart Dimmable Controls', 'Architectural Spotlight Placement', 'Cove Strip Backlighting'],
    order: 8,
    published: true
  },
  {
    _id: 'srv_9',
    title: 'Commercial Interiors',
    slug: 'commercial-interiors',
    description: 'Professional interior solutions for offices, showrooms, retail shops, and studio spaces.',
    longDescription: 'Impression-making commercial interior designs engineered for productivity and brand elegance, incorporating durable acoustic paneling and high-impact ceiling profiles.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    features: ['Brand-Aligned Architecture', 'High-Traffic Durable Finishes', 'Acoustic Soundproofing', 'Ergonomic Workspace Layouts'],
    order: 9,
    published: true
  },
  {
    _id: 'srv_10',
    title: 'Renovation & Upgrades',
    slug: 'renovation-upgrades',
    description: 'Transform existing spaces with modern finishes, new ceilings, and wall paneling.',
    longDescription: 'Revitalize older apartments and traditional homes without complete demolition. Our quick-execution PVC paneling and false ceiling upgrades deliver a brand-new luxury look.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    features: ['Rapid Turnaround Time', 'Dust-Controlled Execution', 'Cost-Effective Modernization', 'Structural Inspections'],
    order: 10,
    published: true
  }
];

let memoryServices = [...defaultServices];

// @desc Get all services
// @route GET /api/services
exports.getServices = async (req, res) => {
  try {
    if (!getDBStatus()) {
      const publishedOnly = memoryServices.filter(s => s.published).sort((a, b) => a.order - b.order);
      return res.status(200).json({ success: true, count: publishedOnly.length, data: publishedOnly });
    }

    const services = await Service.find({ published: true }).sort({ order: 1 });
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Get single service
// @route GET /api/services/:id
exports.getServiceById = async (req, res) => {
  try {
    const param = req.params.id;

    if (!getDBStatus()) {
      const service = memoryServices.find(s => s._id === param || s.slug === param);
      if (!service) return res.status(404).json({ success: false, error: 'Service not found' });
      return res.status(200).json({ success: true, data: service });
    }

    let service = await Service.findById(param).catch(() => null);
    if (!service) {
      service = await Service.findOne({ slug: param });
    }

    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    res.status(200).json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Create service (Admin)
// @route POST /api/services
exports.createService = async (req, res) => {
  try {
    const { title, description, longDescription, image, features, order, published } = req.body;

    if (!title || !description || !image) {
      return res.status(400).json({ success: false, error: 'Title, description, and image are required' });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    if (!getDBStatus()) {
      const newService = {
        _id: 'srv_' + Date.now(),
        title,
        slug,
        description,
        longDescription: longDescription || description,
        image,
        features: features || [],
        order: order || memoryServices.length + 1,
        published: published !== undefined ? published : true,
        createdAt: new Date()
      };
      memoryServices.push(newService);
      return res.status(201).json({ success: true, data: newService });
    }

    const service = await Service.create({
      title,
      slug,
      description,
      longDescription,
      image,
      features: features || [],
      order,
      published
    });

    res.status(201).json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Update service (Admin)
// @route PUT /api/services/:id
exports.updateService = async (req, res) => {
  try {
    if (!getDBStatus()) {
      const idx = memoryServices.findIndex(s => s._id === req.params.id);
      if (idx === -1) return res.status(404).json({ success: false, error: 'Service not found' });
      memoryServices[idx] = { ...memoryServices[idx], ...req.body };
      return res.status(200).json({ success: true, data: memoryServices[idx] });
    }

    let service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Delete service (Admin)
// @route DELETE /api/services/:id
exports.deleteService = async (req, res) => {
  try {
    if (!getDBStatus()) {
      memoryServices = memoryServices.filter(s => s._id !== req.params.id);
      return res.status(200).json({ success: true, data: {} });
    }

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }

    await service.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
