const mysql = require('mysql2');
const dotenv = require('dotenv');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Determine if we're in production (Railway)
const isProduction = process.env.NODE_ENV === 'production';
const isRailway = process.env.DB_HOST && process.env.DB_HOST.includes('railway.app');

const poolConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'smartseason',
    port: parseInt(process.env.DB_PORT) || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    connectTimeout: 60000, // 60 seconds timeout for Railway
    acquireTimeout: 60000
};

// Add SSL configuration for Railway (required for cloud databases)
if (isRailway || isProduction) {
    poolConfig.ssl = {
        rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED === 'false' ? false : true
    };
    console.log('🔒 SSL enabled for cloud database connection');
}

const pool = mysql.createPool(poolConfig);
const promisePool = pool.promise();

// Test connection with retry logic
const testConnection = async (retries = 5) => {
    for (let i = 0; i < retries; i++) {
        try {
            const connection = await promisePool.getConnection();
            console.log(`✅ Database connected successfully to ${process.env.DB_HOST || 'localhost'}`);
            connection.release();
            return true;
        } catch (error) {
            console.error(`Database connection attempt ${i + 1} failed:`, error.message);
            if (i === retries - 1) {
                console.error('❌ All database connection attempts failed');
                return false;
            }
            // Wait 3 seconds before retrying
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
    return false;
};

// Initialize database with migration
const initDatabase = async () => {
    try {
        const isConnected = await testConnection();
        if (!isConnected) {
            throw new Error('Could not connect to database');
        }

        // Check if tables exist, if not create them
        const [tables] = await promisePool.execute(`
            SELECT COUNT(*) as count 
            FROM information_schema.tables 
            WHERE table_schema = DATABASE()
        `);

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

        console.log('✅ Database tables verified/created successfully');

        // Check if users exist in production (Railway)
        const [users] = await promisePool.execute('SELECT COUNT(*) as count FROM users');
        
        if (users[0].count === 0 && isRailway) {
            console.log('⚠️ No users found in Railway database. You need to import your data.');
            console.log('Run: mysql -h YOUR_HOST -u root -p railway < smartseason_backup.sql');
        } else {
            console.log(`✅ Found ${users[0].count} existing users`);
        }

        return true;
    } catch (error) {
        console.error('Database initialization error:', error);
        return false;
    }
};

module.exports = { pool: promisePool, initDatabase, testConnection };