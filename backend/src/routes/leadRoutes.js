const express = require('express');
const { createLead, getLeads, getLeadById, updateLead, deleteLead } = require('../controllers/leadController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', createLead);
router.get('/', protect, authorize('ADMIN'), getLeads);
router.get('/:id', protect, authorize('ADMIN'), getLeadById);
router.put('/:id', protect, authorize('ADMIN'), updateLead);
router.delete('/:id', protect, authorize('ADMIN'), deleteLead);

module.exports = router;
