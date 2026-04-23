# 🌾 SmartSeason Field Monitoring System

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Fabby24/smartSeason)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)](https://mysql.com)

## 📋 Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Status Determination Logic](#status-determination-logic)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

SmartSeason is a comprehensive field monitoring system designed for agricultural operations to track crop progress across multiple fields during growing seasons. The system provides real-time insights, role-based access control, and intelligent status monitoring to help farm coordinators and field agents make data-driven decisions.

### Problem Statement
Agricultural operations struggle with:
- Manual tracking of field progress across large areas
- Delayed response to crop issues
- Lack of real-time visibility into field conditions
- Inefficient communication between coordinators and field agents

### Solution
SmartSeason addresses these challenges by providing:
- Centralized field management dashboard
- Real-time status monitoring with intelligent alerts
- Mobile-responsive interface for field agents
- Comprehensive reporting and analytics

## ✨ Key Features

### For Administrators
- **Dashboard Analytics**: Real-time charts and statistics
- **Field Management**: Create, assign, and monitor all fields
- **Agent Management**: Add and manage field agents
- **Reports**: Export data and generate insights
- **Schedule Management**: Assign tasks to agents

### For Field Agents
- **Assigned Fields**: View only assigned fields
- **Stage Updates**: Update crop growth stages
- **Notes & Observations**: Add detailed field notes
- **Schedule View**: See assigned tasks and deadlines
- **Mobile Access**: Responsive design for field use

### Core Capabilities
- 🔐 **Secure Authentication**: JWT-based role management
- 📊 **Real-time Status**: Automatic field health calculation
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 📈 **Analytics Dashboard**: Interactive charts and metrics
- 🔔 **Smart Alerts**: Automatic risk detection
- 📝 **Audit Trail**: Complete update history

## 🧠 Status Determination Logic

### Overview
The field status is a computed value that represents the overall health and progress of a crop field. Unlike the growth stage (which is manually updated), the status is automatically calculated based on multiple factors to provide an objective assessment of field performance.

### Status Types

| Status | Icon | Meaning | Action Required |
|--------|------|---------|-----------------|
| **Active** | 🟢 | Field is progressing normally within expected timelines | Routine monitoring |
| **At Risk** | 🔴 | Field shows signs of problems or delays | Immediate attention required |
| **Completed** | 🔵 | Field has reached harvest stage and finished | No further action needed |

### Detailed Logic Implementation

```javascript
const calculateStatus = (currentStage, plantingDate, lastUpdateDate) => {
    const today = new Date();
    const planting = new Date(plantingDate);
    const daysSincePlanting = Math.floor((today - planting) / (1000 * 60 * 60 * 24));
    
    // Rule 1: Completed fields
    if (currentStage === 'harvested') {
        return 'completed';
    }
    
    // Rule 2: Update frequency check (At Risk condition)
    if (lastUpdateDate) {
        const lastUpdate = new Date(lastUpdateDate);
        const daysSinceUpdate = Math.floor((today - lastUpdate) / (1000 * 60 * 60 * 24));
        
        // No updates in 14+ days - Field might be abandoned or neglected
        if (daysSinceUpdate > 14) {
            return 'at_risk';
        }
    }
    
    // Rule 3: Growth progress check (At Risk condition)
    const expectedStage = getExpectedStage(daysSincePlanting);
    const currentStageOrder = getStageOrder(currentStage);
    const expectedStageOrder = getStageOrder(expectedStage);
    
    // Field is significantly behind schedule (more than 1 stage behind)
    if (currentStageOrder < expectedStageOrder - 1) {
        return 'at_risk';
    }
    
    // Rule 4: All checks passed
    return 'active';
};

// Expected growth timeline (in days)
const getExpectedStage = (daysSincePlanting) => {
    if (daysSincePlanting < 30) return 'planted';      // First month
    if (daysSincePlanting < 60) return 'growing';      // 1-2 months
    if (daysSincePlanting < 90) return 'ready';        // 2-3 months
    return 'harvested';                                 // 3+ months
};

// Stage order for comparison
const getStageOrder = (stage) => {
    const order = { 
        'planted': 1, 
        'growing': 2, 
        'ready': 3, 
        'harvested': 4 
    };
    return order[stage] || 0;
};
```

# Clone the repository
git clone https://github.com/Fabby24/smartSeason.git
cd smartseason

# Navigate to backend directory
cd backend

# Install dependencies
npm install


# Navigate to frontend directory
cd frontend

# Install dependencies
npm install


# Edit .env with backend URL
echo "VITE_API_URL=http://localhost:5000/api" 

# 🤝 Contributing
-Fork the repository

-Create feature branch (git checkout -b feature/AmazingFeature)

-Commit changes (git commit -m 'Add some AmazingFeature')

-Push to branch (git push origin feature/AmazingFeature)

-Open Pull Request

Coding Standards
Use ESLint for JavaScript

Follow Airbnb style guide

Write meaningful commit messages

Add comments for complex logic

### 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

### 👤 Author
Fabian Mutune Musau

GitHub: @Fabby24

LinkedIn: Fabian Musau

Email: musaufabian7@gmail.com# smartSeason
