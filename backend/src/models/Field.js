const { pool } = require('../config/database');

// Calculate field status based on stages and updates
const calculateStatus = (currentStage, plantingDate, lastUpdateDate) => {
    const today = new Date();
    const planting = new Date(plantingDate);
    const daysSincePlanting = Math.floor((today - planting) / (1000 * 60 * 60 * 24));
    
    // Status logic:
    // - Active: Normal progression within expected timeline
    // - At Risk: Delayed progress (>7 days without update or abnormal timeline)
    // - Completed: Harvested stage
    
    if (currentStage === 'harvested') {
        return 'completed';
    }
    
    // Check if no update in last 14 days
    if (lastUpdateDate) {
        const lastUpdate = new Date(lastUpdateDate);
        const daysSinceUpdate = Math.floor((today - lastUpdate) / (1000 * 60 * 60 * 24));
        if (daysSinceUpdate > 14) {
            return 'at_risk';
        }
    }
    
    // Check if progress is abnormally slow
    const expectedStage = getExpectedStage(daysSincePlanting);
    if (getStageOrder(currentStage) < getStageOrder(expectedStage) - 1) {
        return 'at_risk';
    }
    
    return 'active';
};

const getExpectedStage = (daysSincePlanting) => {
    if (daysSincePlanting < 30) return 'planted';
    if (daysSincePlanting < 60) return 'growing';
    if (daysSincePlanting < 90) return 'ready';
    return 'harvested';
};

const getStageOrder = (stage) => {
    const order = { planted: 1, growing: 2, ready: 3, harvested: 4 };
    return order[stage] || 0;
};

const getFieldsWithStatus = async (userId, role) => {
    let query = `
        SELECT f.*, 
               u.full_name as assigned_agent_name,
               (SELECT notes FROM field_updates WHERE field_id = f.id ORDER BY created_at DESC LIMIT 1) as latest_note,
               (SELECT created_at FROM field_updates WHERE field_id = f.id ORDER BY created_at DESC LIMIT 1) as last_update_date
        FROM fields f
        LEFT JOIN users u ON f.assigned_agent_id = u.id
    `;
    
    const params = [];
    
    if (role === 'agent') {
        query += ' WHERE f.assigned_agent_id = ?';
        params.push(userId);
    }
    
    const [fields] = await pool.execute(query, params);
    
    // Add computed status
    return fields.map(field => ({
        ...field,
        status: calculateStatus(field.current_stage, field.planting_date, field.last_update_date)
    }));
};

module.exports = { getFieldsWithStatus, calculateStatus, getStageOrder };