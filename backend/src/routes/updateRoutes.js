const express = require('express');
const { addUpdate, getFieldUpdates } = require('../controllers/updateController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

// Add update to a field
router.post('/', addUpdate);

// Get all updates for a specific field
router.get('/field/:fieldId', getFieldUpdates);

module.exports = router;