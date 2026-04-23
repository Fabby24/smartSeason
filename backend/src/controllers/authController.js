const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const [users] = await pool.execute(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            [username, username]
        );
        
        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const user = users[0];
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );
        
        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                full_name: user.full_name
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const signup = async (req, res) => {
    try {
        const { username, email, password, full_name, role = 'agent' } = req.body;
        
        // Check if user already exists
        const [existingUsers] = await pool.execute(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            [username, email]
        );
        
        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user (only agents can sign up, admins must be created manually)
        const [result] = await pool.execute(
            'INSERT INTO users (username, email, password_hash, role, full_name) VALUES (?, ?, ?, ?, ?)',
            [username, email, hashedPassword, 'agent', full_name]
        );
        
        // Generate token
        const token = jwt.sign(
            { id: result.insertId, role: 'agent' },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );
        
        res.status(201).json({
            message: 'Account created successfully',
            token,
            user: {
                id: result.insertId,
                username,
                email,
                role: 'agent',
                full_name
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getMe = async (req, res) => {
    res.json(req.user);
};

const getAllUsers = async (req, res) => {
    try {
        // Only admins can view all users
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access required' });
        }
        
        const [users] = await pool.execute(
            'SELECT id, username, email, role, full_name, created_at FROM users'
        );
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

module.exports = { login, signup, getMe, getAllUsers };