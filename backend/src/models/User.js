const { pool } = require('../config/database');

const findById = async (id) => {
    const [rows] = await pool.execute(
        'SELECT id, username, email, role, full_name, created_at FROM users WHERE id = ?',
        [id]
    );
    return rows[0];
};

const findByEmail = async (email) => {
    const [rows] = await pool.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );
    return rows[0];
};

const findByUsername = async (username) => {
    const [rows] = await pool.execute(
        'SELECT * FROM users WHERE username = ?',
        [username]
    );
    return rows[0];
};

const create = async (userData) => {
    const { username, email, password_hash, role, full_name } = userData;
    const [result] = await pool.execute(
        'INSERT INTO users (username, email, password_hash, role, full_name) VALUES (?, ?, ?, ?, ?)',
        [username, email, password_hash, role, full_name]
    );
    return result.insertId;
};

const getAllAgents = async () => {
    const [rows] = await pool.execute(
        'SELECT id, username, email, full_name FROM users WHERE role = "agent"'
    );
    return rows;
};

module.exports = { findById, findByEmail, findByUsername, create, getAllAgents };