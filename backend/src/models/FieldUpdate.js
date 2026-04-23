const { pool } = require('../config/database');

const create = async (updateData) => {
    const { field_id, agent_id, stage, notes } = updateData;
    const [result] = await pool.execute(
        'INSERT INTO field_updates (field_id, agent_id, stage, notes) VALUES (?, ?, ?, ?)',
        [field_id, agent_id, stage, notes || null]
    );
    return result.insertId;
};

const getByFieldId = async (fieldId) => {
    const [rows] = await pool.execute(
        `SELECT fu.*, u.full_name as agent_name 
         FROM field_updates fu 
         JOIN users u ON fu.agent_id = u.id 
         WHERE fu.field_id = ? 
         ORDER BY fu.created_at DESC`,
        [fieldId]
    );
    return rows;
};

const getLatestByFieldId = async (fieldId) => {
    const [rows] = await pool.execute(
        `SELECT * FROM field_updates 
         WHERE field_id = ? 
         ORDER BY created_at DESC 
         LIMIT 1`,
        [fieldId]
    );
    return rows[0];
};

module.exports = { create, getByFieldId, getLatestByFieldId };