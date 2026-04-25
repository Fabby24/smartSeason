# 🌾 SmartSeason Field Monitoring System

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Fabby24/smartSeason)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg)](https://smartseason.musaufabian7.workers.dev)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)](https://mysql.com)

---

## 🚀 Live Demo

👉 https://smartseason.musaufabian7.workers.dev  

### 🔐 Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| Field Agent | `john_doe` | `agent123` |

---

## 📋 Table of Contents

- Overview  
- Problem & Solution  
- Features  
- System Design  
- Status Logic  
- Tech Stack  
- Architecture  
- Design Decisions  
- Assumptions  
- Installation  
- API Documentation  
- Deployment  
- Testing  
- Troubleshooting  
- Project Structure  
- Author  

---

## 🌟 Overview

SmartSeason is a full-stack web application designed to help agricultural teams monitor crop progress across multiple fields in real time.

It enables **coordinators (admins)** and **field agents** to collaborate efficiently by tracking field stages, updates, and overall field health.

---

## ❗ Problem & Solution

### Problem

Agricultural operations often face:

- Manual and inconsistent field tracking  
- Lack of real-time updates  
- Poor coordination between field agents and managers  
- Delayed detection of crop issues  

### Solution

SmartSeason provides:

- Centralized dashboard for all fields  
- Real-time updates from field agents  
- Automated status monitoring  
- Role-based access control  

---

## ✨ Features

### 👨‍💼 Admin (Coordinator)

- View all fields  
- Assign fields to agents  
- Monitor updates  
- Dashboard analytics  
- Track field performance  

### 👩‍🌾 Field Agent

- View assigned fields only  
- Update crop stages  
- Add field notes  
- Track assigned tasks  

### 🌐 Core Features

- JWT Authentication  
- Role-based access control  
- Field lifecycle tracking  
- Real-time status computation  
- Responsive UI  

---

## 🧠 Status Logic

Each field has a computed **status** based on its data:

| Status | Meaning |
|--------|--------|
| Active | Field progressing normally |
| At Risk | Delayed or inactive |
| Completed | Harvested |

### Implementation

```javascript
const calculateStatus = (currentStage, plantingDate, lastUpdateDate) => {
    const today = new Date();
    const planting = new Date(plantingDate);
    const daysSincePlanting = Math.floor((today - planting) / (1000 * 60 * 60 * 24));

    if (currentStage === 'harvested') return 'completed';

    if (lastUpdateDate) {
        const lastUpdate = new Date(lastUpdateDate);
        const daysSinceUpdate = Math.floor((today - lastUpdate) / (1000 * 60 * 60 * 24));
        if (daysSinceUpdate > 14) return 'at_risk';
    }

    const expectedStage = getExpectedStage(daysSincePlanting);

    if (getStageOrder(currentStage) < getStageOrder(expectedStage) - 1) {
        return 'at_risk';
    }

    return 'active';
};
```
## 🛠 Tech Stack

### Frontend
- React  
- Tailwind CSS  
- Axios  
- React Router  

### Backend
- Node.js  
- Express  
- MySQL  
- JWT Authentication  

### Deployment
- Railway (Backend + DB)  
- Cloudflare Pages (Frontend)  

---

## 🏗 Architecture

### Explanation

The system follows a **3-tier architecture**:

#### 1. Frontend (React)
- Handles UI and user interactions  
- Communicates with backend via API  

#### 2. Backend (Node.js + Express)
- Handles business logic  
- Processes authentication  
- Manages API endpoints  

#### 3. Database (MySQL)
- Stores users, fields, and updates  


---

## 🧠 Design Decisions

### 1. Role-Based Access Control
Implemented JWT authentication to ensure:
- Admin sees all fields  
- Agents see only assigned fields  

### 2. Computed Field Status
Instead of storing status, it is dynamically calculated to ensure:
- Accuracy  
- Real-time insights  
- No stale data  

### 3. RESTful API Design
Used structured endpoints:
- `/api/auth`  
- `/api/fields`  
- `/api/updates`  

### 4. Separation of Concerns
- Controllers → logic  
- Routes → endpoints  
- Models → data  

### 5. Mobile-First UI
Designed a responsive interface for field agents working in rural areas.  


## ⚠️ Assumptions

- Each field is assigned to one agent at a time  
- Field stages follow a linear progression  
- Internet access is available for updates  
- Crop timelines are generalized (not crop-specific)  
- Authentication is required for all operations  

---

## 💻 Installation

### Clone Repository

git clone https://github.com/Fabby24/smartSeason.git
cd smartSeason

## Backend Setup
cd backend
npm install
npm run dev

## Frontend Setup
cd frontend
npm install
npm run dev



### 👤 Author

- Fabian Mutune Musau

GitHub: https://github.com/Fabby24
Email: musaufabian7@gmail.com
### 🔗 Links
Live App: https://smartseason.musaufabian7.workers.dev
API: https://smartseason-production-151b.up.railway.app/api
Repository: https://github.com/Fabby24/smartSeason

```