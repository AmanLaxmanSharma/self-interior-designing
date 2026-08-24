const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const User = require('../models/User');
const Service = require('../models/Service');
const Project = require('../models/Project');
const Gallery = require('../models/Gallery');
const Model3D = require('../models/Model3D');
const WebsiteSettings = require('../models/WebsiteSettings');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/karoli_interior_hub';
    await mongoose.connect(mongoUri);
    console.log('[Seed]: Connected to MongoDB...');

    // Clear existing
    await User.deleteMany();
    await Service.deleteMany();
    await Project.deleteMany();
    await Gallery.deleteMany();
    await Model3D.deleteMany();
    await WebsiteSettings.deleteMany();

    // 1. Create Admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@karoliinterior.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@password123';

    await User.create({
      name: 'Karoli Master Admin',
      email: adminEmail,
      phone: '7347733581',
      password: adminPassword,
      role: 'ADMIN'
    });

    console.log(`[Seed]: Created Admin Account (${adminEmail})`);

    // 2. Create Services
    const services = [
      {
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
    await Service.insertMany(services);
    console.log('[Seed]: Created 10 Services');

    // 3. Create Projects
    const projects = [
      {
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
        published: true
      },
      {
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
        published: true
      },
      {
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
        published: true
      },
      {
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
        published: true
      }
    ];
    await Project.insertMany(projects);
    console.log('[Seed]: Created Sample Projects');

    // 4. Website Settings
    await WebsiteSettings.create({
      companyName: 'Karoli Interior Hub',
      phones: ['7347733581', '8808111000'],
      email: 'Primepvcpannal@gmail.com',
      whatsapp: '917347733581',
      address: 'Karoli Interior Hub Studio, India',
      hero: {
        title: 'Transform Your Space Into Something Extraordinary',
        subtitle: 'Premium interior design, false ceiling, PVC panel and wall design solutions crafted for modern homes and spaces.',
        ctaText: 'Get Free Consultation'
      },
      popupSettings: {
        delaySeconds: 5,
        enabled: true
      }
    });
    console.log('[Seed]: Created Website Settings');

    console.log('[Seed]: Database seeding finished successfully.');
    process.exit(0);
  } catch (err) {
    console.error('[Seed Error]:', err);
    process.exit(1);
  }
};

seedData();
