const express = require('express');
const { getModels, getModelById, createModel, deleteModel } = require('../controllers/model3dController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getModels);
router.get('/:id', getModelById);
router.post('/', protect, authorize('ADMIN'), createModel);
router.delete('/:id', protect, authorize('ADMIN'), deleteModel);

module.exports = router;
