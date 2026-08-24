const Lead = require('../models/Lead');
const { getDBStatus } = require('../config/db');

// In-memory array fallback if MongoDB is not connected
let memoryLeads = [
  {
    _id: 'lead_demo_1',
    name: 'Rajesh Kumar',
    phone: '9876543210',
    email: 'rajesh.k@gmail.com',
    city: 'Lucknow',
    projectType: 'False Ceiling',
    budget: '₹1 Lakh - ₹3 Lakhs',
    message: 'Looking for modern PVC ceiling with LED strip lighting for my living room.',
    status: 'New',
    notes: 'Called customer, scheduled site inspection for Thursday.',
    createdAt: new Date()
  },
  {
    _id: 'lead_demo_2',
    name: 'Anita Verma',
    phone: '9988776655',
    email: 'anita.verma@yahoo.com',
    city: 'Kanpur',
    projectType: 'Full Home Interior',
    budget: '₹5 Lakhs - ₹10 Lakhs',
    message: 'Interested in complete interior design with wall paneling and modular kitchen.',
    status: 'Contacted',
    notes: 'Sent initial 3D portfolio designs via WhatsApp.',
    createdAt: new Date(Date.now() - 86400000)
  }
];

// @desc Create new lead
// @route POST /api/leads
exports.createLead = async (req, res) => {
  try {
    const { name, phone, email, city, projectType, budget, message } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({ success: false, error: 'Full name, phone, and email are required fields.' });
    }

    if (!getDBStatus()) {
      const newMemoryLead = {
        _id: 'lead_mem_' + Date.now(),
        name,
        phone,
        email,
        city: city || 'Not Specified',
        projectType: projectType || 'Full Home Interior',
        budget: budget || 'Flexible',
        message: message || '',
        status: 'New',
        notes: '',
        createdAt: new Date()
      };
      memoryLeads.unshift(newMemoryLead);
      return res.status(201).json({ success: true, data: newMemoryLead, message: 'Consultation request submitted successfully!' });
    }

    const lead = await Lead.create({
      name,
      phone,
      email,
      city,
      projectType,
      budget,
      message
    });

    res.status(201).json({
      success: true,
      data: lead,
      message: 'Consultation request submitted successfully! Our team will contact you shortly.'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Get all leads (Admin)
// @route GET /api/leads
exports.getLeads = async (req, res) => {
  try {
    const { search, status } = req.query;

    if (!getDBStatus()) {
      let filtered = [...memoryLeads];
      if (status && status !== 'All') {
        filtered = filtered.filter(l => l.status === status);
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(l =>
          l.name.toLowerCase().includes(q) ||
          l.phone.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.city.toLowerCase().includes(q)
        );
      }
      return res.status(200).json({ success: true, count: filtered.length, data: filtered });
    }

    let query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } }
      ];
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Get single lead
// @route GET /api/leads/:id
exports.getLeadById = async (req, res) => {
  try {
    if (!getDBStatus()) {
      const lead = memoryLeads.find(l => l._id === req.params.id);
      if (!lead) return res.status(404).json({ success: false, error: 'Lead not found' });
      return res.status(200).json({ success: true, data: lead });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }

    res.status(200).json({ success: true, data: lead });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Update lead status & notes (Admin)
// @route PUT /api/leads/:id
exports.updateLead = async (req, res) => {
  try {
    const { status, notes } = req.body;

    if (!getDBStatus()) {
      const lead = memoryLeads.find(l => l._id === req.params.id);
      if (!lead) return res.status(404).json({ success: false, error: 'Lead not found' });
      if (status) lead.status = status;
      if (notes !== undefined) lead.notes = notes;
      return res.status(200).json({ success: true, data: lead });
    }

    let lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }

    if (status) lead.status = status;
    if (notes !== undefined) lead.notes = notes;

    await lead.save();

    res.status(200).json({
      success: true,
      data: lead
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc Delete lead (Admin)
// @route DELETE /api/leads/:id
exports.deleteLead = async (req, res) => {
  try {
    if (!getDBStatus()) {
      memoryLeads = memoryLeads.filter(l => l._id !== req.params.id);
      return res.status(200).json({ success: true, data: {} });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }

    await lead.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
