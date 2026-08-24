const express = require('express');
const { getGallery, addGalleryImage, deleteGalleryImage } = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getGallery);
router.post('/', protect, authorize('ADMIN'), addGalleryImage);
router.delete('/:id', protect, authorize('ADMIN'), deleteGalleryImage);

module.exports = router;
