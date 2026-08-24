const express = require('express');
const { getProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', protect, authorize('ADMIN'), createProject);
router.put('/:id', protect, authorize('ADMIN'), updateProject);
router.delete('/:id', protect, authorize('ADMIN'), deleteProject);

module.exports = router;
