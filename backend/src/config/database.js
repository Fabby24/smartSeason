const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Determine if we're using SSL (cloud databases typically require SSL)
const isCloud = process.env.DB_HOST && !process.env.DB_HOST.includes('localhost');

const poolConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'smartseason',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
};

// Add SSL configuration for cloud databases
if (isCloud) {
    poolConfig.ssl = {
        rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true' || false
    };
}

const pool = mysql.createPool(poolConfig);
const promisePool = pool.promise();

// Test connection
const testConnection = async () => {
    try {
        const connection = await promisePool.getConnection();
        console.log(`✅ Database connected successfully to ${process.env.DB_HOST || 'localhost'}`);
        connection.release();
        return true;
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        console.error('Please check your database credentials in .env file');
        return false;
    }
};

// Database initialization with retry logic
const initDatabase = async (retries = 5) => {
    for (let i = 0; i < retries; i++) {
        try {
            const isConnected = await testConnection();
            if (!isConnected) {
                throw new Error('Connection failed');
            }

            // Create tables if they don't exist
            await promisePool.execute(`
                CREATE TABLE IF NOT EXISTS users (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    username VARCHAR(50) UNIQUE NOT NULL,
                    email VARCHAR(100) UNIQUE NOT NULL,
                    password_hash VARCHAR(255) NOT NULL,
                    role ENUM('admin', 'agent') NOT NULL,
                    full_name VARCHAR(100) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            await promisePool.execute(`
                CREATE TABLE IF NOT EXISTS fields (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    name VARCHAR(100) NOT NULL,
                    crop_type VARCHAR(50) NOT NULL,
                    planting_date DATE NOT NULL,
                    current_stage ENUM('planted', 'growing', 'ready', 'harvested') DEFAULT 'planted',
                    assigned_agent_id INT,
                    created_by INT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (assigned_agent_id) REFERENCES users(id) ON DELETE SET NULL,
                    FOREIGN KEY (created_by) REFERENCES users(id)
                )
            `);

            await promisePool.execute(`
                CREATE TABLE IF NOT EXISTS field_updates (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    field_id INT NOT NULL,
                    agent_id INT NOT NULL,
                    stage ENUM('planted', 'growing', 'ready', 'harvested') NOT NULL,
                    notes TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (field_id) REFERENCES fields(id) ON DELETE CASCADE,
                    FOREIGN KEY (agent_id) REFERENCES users(id)
                )
            `);

            await promisePool.execute(`
                CREATE TABLE IF NOT EXISTS schedules (
                    id INT PRIMARY KEY AUTO_INCREMENT,
                    field_id INT NOT NULL,
                    agent_id INT NOT NULL,
                    task_type VARCHAR(50) NOT NULL,
                    scheduled_date DATE NOT NULL,
                    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
                    notes TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (field_id) REFERENCES fields(id) ON DELETE CASCADE,
                    FOREIGN KEY (agent_id) REFERENCES users(id) ON DELETE CASCADE
                )
            `);

            // Check if users exist, if not create default admin
            const [users] = await promisePool.execute('SELECT COUNT(*) as count FROM users');
            if (users[0].count === 0) {
                const bcrypt = require('bcryptjs');
                const adminPassword = await bcrypt.hash('admin123', 10);
                await promisePool.execute(
                    'INSERT INTO users (username, email, password_hash, role, full_name) VALUES (?, ?, ?, ?, ?)',
                    ['admin', 'admin@smartseason.com', adminPassword, 'admin', 'System Administrator']
                );
                console.log('✅ Default admin created');
            }

            console.log('✅ Database initialized successfully');
            return true;
        } catch (error) {
            console.error(`Database initialization attempt ${i + 1} failed:`, error.message);
            if (i === retries - 1) {
                console.error('❌ All database initialization attempts failed');
                return false;
            }
            // Wait 2 seconds before retrying
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    return false;
};

module.exports = { pool: promisePool, initDatabase, testConnection };