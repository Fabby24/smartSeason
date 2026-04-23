const { pool } = require('../config/database');
const { getFieldsWithStatus, getStageOrder } = require('../models/Field');

const getFields = async (req, res) => {
    try {
        const fields = await getFieldsWithStatus(req.user.id, req.user.role);
        res.json(fields);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching fields', error: error.message });
    }
};

const createField = async (req, res) => {
    try {
        const { name, crop_type, planting_date, assigned_agent_id, current_stage } = req.body;
        
        // Admin only
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Only admins can create fields' });
        }
        
        const [result] = await pool.execute(
            'INSERT INTO fields (name, crop_type, planting_date, assigned_agent_id, current_stage, created_by) VALUES (?, ?, ?, ?, ?, ?)',
            [name, crop_type, planting_date, assigned_agent_id || null, current_stage || 'planted', req.user.id]
        );
        
        const [newField] = await pool.execute('SELECT * FROM fields WHERE id = ?', [result.insertId]);
        res.status(201).json(newField[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error creating field', error: error.message });
    }
};

const updateFieldStage = async (req, res) => {
    try {
        const { id } = req.params;
        const { stage, notes } = req.body;
        
        // Check if agent has access to this field
        if (req.user.role === 'agent') {
            const [fields] = await pool.execute(
                'SELECT * FROM fields WHERE id = ? AND assigned_agent_id = ?',
                [id, req.user.id]
            );
            if (fields.length === 0) {
                return res.status(403).json({ message: 'Not authorized to update this field' });
            }
        }
        
        // Update field stage
        await pool.execute(
            'UPDATE fields SET current_stage = ? WHERE id = ?',
            [stage, id]
        );
        
        // Record update
        await pool.execute(
            'INSERT INTO field_updates (field_id, agent_id, stage, notes) VALUES (?, ?, ?, ?)',
            [id, req.user.id, stage, notes || null]
        );
        
        const [updatedField] = await pool.execute('SELECT * FROM fields WHERE id = ?', [id]);
        res.json(updatedField[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating field', error: error.message });
    }
};

const getAgents = async (req, res) => {
    try {
        const [agents] = await pool.execute(
            'SELECT id, username, email, full_name FROM users WHERE role = "agent"'
        );
        res.json(agents);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching agents', error: error.message });
    }
};

module.exports = { getFields, createField, updateFieldStage, getAgents };