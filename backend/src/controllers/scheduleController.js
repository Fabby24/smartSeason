const { pool } = require('../config/database');

const getSchedules = async (req, res) => {
    try {
        let query = `
            SELECT s.*, f.name as field_name 
            FROM schedules s
            JOIN fields f ON s.field_id = f.id
        `;
        const params = [];
        
        if (req.user.role === 'agent') {
            query += ' WHERE s.agent_id = ?';
            params.push(req.user.id);
        }
        
        query += ' ORDER BY s.scheduled_date ASC';
        
        const [schedules] = await pool.execute(query, params);
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schedules', error: error.message });
    }
};

const createSchedule = async (req, res) => {
    try {
        const { field_id, agent_id, task_type, scheduled_date, notes } = req.body;
        
        // Only admins can create schedules
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access required' });
        }
        
        const [result] = await pool.execute(
            `INSERT INTO schedules (field_id, agent_id, task_type, scheduled_date, notes, status) 
             VALUES (?, ?, ?, ?, ?, 'pending')`,
            [field_id, agent_id, task_type, scheduled_date, notes || null]
        );
        
        const [newSchedule] = await pool.execute(
            'SELECT * FROM schedules WHERE id = ?',
            [result.insertId]
        );
        
        res.status(201).json(newSchedule[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error creating schedule', error: error.message });
    }
};

module.exports = { getSchedules, createSchedule };