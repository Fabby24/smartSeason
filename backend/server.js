const app = require('./src/app');
const { initDatabase } = require('./src/config/database');

const PORT = process.env.PORT || 5000;

// Initialize database and start server
const startServer = async () => {
    try {
        await initDatabase();
        console.log('✅ Database connected and initialized');
        
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📍 API URL: http://localhost:${PORT}/api`);
            console.log(`🔑 Health check: http://localhost:${PORT}/api/health`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();