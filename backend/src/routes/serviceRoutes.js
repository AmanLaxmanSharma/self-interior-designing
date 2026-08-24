const express = require('express');
const { getServices, getServiceById, createService, updateService, deleteService } = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', protect, authorize('ADMIN'), createService);
router.put('/:id', protect, authorize('ADMIN'), updateService);
router.delete('/:id', protect, authorize('ADMIN'), deleteService);

module.exports = router;
