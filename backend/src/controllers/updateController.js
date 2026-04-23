const { pool } = require('../config/database');
const { create, getByFieldId } = require('../models/FieldUpdate');

const addUpdate = async (req, res) => {
    try {
        const { field_id, stage, notes } = req.body;
        
        // Check if agent has access to this field
        if (req.user.role === 'agent') {
            const [fields] = await pool.execute(
                'SELECT * FROM fields WHERE id = ? AND assigned_agent_id = ?',
                [field_id, req.user.id]
            );
            if (fields.length === 0) {
                return res.status(403).json({ message: 'Not authorized to update this field' });
            }
        }
        
        // Update field stage
        await pool.execute(
            'UPDATE fields SET current_stage = ? WHERE id = ?',
            [stage, field_id]
        );
        
        // Create update record
        const updateId = await create({
            field_id,
            agent_id: req.user.id,
            stage,
            notes
        });
        
        const [newUpdate] = await pool.execute(
            'SELECT * FROM field_updates WHERE id = ?',
            [updateId]
        );
        
        res.status(201).json(newUpdate[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error adding update', error: error.message });
    }
};

const getFieldUpdates = async (req, res) => {
    try {
        const { fieldId } = req.params;
        
        // Verify access
        if (req.user.role === 'agent') {
            const [fields] = await pool.execute(
                'SELECT * FROM fields WHERE id = ? AND assigned_agent_id = ?',
                [fieldId, req.user.id]
            );
            if (fields.length === 0) {
                return res.status(403).json({ message: 'Not authorized to view these updates' });
            }
        }
        
        const updates = await getByFieldId(fieldId);
        res.json(updates);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching updates', error: error.message });
    }
};

module.exports = { addUpdate, getFieldUpdates };