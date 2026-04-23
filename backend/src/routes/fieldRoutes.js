const express = require('express');
const { 
    getFields, 
    createField, 
    updateFieldStage, 
    getAgents 
} = require('../controllers/fieldController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

// Get all fields (filtered by role)
router.get('/', getFields);

// Get all agents (admin only)
router.get('/agents', adminOnly, getAgents);

// Create new field (admin only)
router.post('/', adminOnly, createField);

// Update field stage (agent can update assigned fields, admin can update any)
router.put('/:id/stage', updateFieldStage);

module.exports = router;