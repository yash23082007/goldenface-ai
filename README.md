# GoldenFaceAI 🌟

> Privacy-first biometric analysis using Geometric Computer Vision and the Golden Ratio (φ ≈ 1.618)

[![GitHub](https://img.shields.io/badge/GitHub-goldenface--ai-181717?style=for-the-badge&logo=github)](https://github.com/yash23082007/goldenface-ai)
![Golden Ratio](https://img.shields.io/badge/Golden_Ratio-φ_≈_1.618-C5A059?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-20+-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)
![Pinecone](https://img.shields.io/badge/Pinecone-Vector_DB-000000?style=flat-square)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [The Mathematics](#the-mathematics)
- [API Reference](#api-reference)
- [Developer](#developer)

## 🎯 Overview

GoldenFaceAI is a privacy-first, client-side biometric analysis engine. Unlike traditional beauty filters that rely on pixel manipulation, GoldenFaceAI uses **Geometric Computer Vision** to map the structural topology of the human face (468 landmarks) and quantify it against the Golden Ratio.

### Core Value Proposition

- **🔒 Privacy-First**: All ML inference occurs on your device via WebAssembly. No raw images are sent to the cloud.
- **🧠 Vector Intelligence**: High-dimensional vector embeddings find your "Geometric Doppelgänger" from celebrities and classical art.
- **👔 Algorithmic Styling**: Translates geometric data into actionable fashion advice (eyewear, hairstyles).

## ✨ Features

### 1. Real-Time Face Mesh Analysis
- 468 facial landmark detection using Google MediaPipe
- Real-time WebGL overlay visualization
- Normalized measurements (distance-invariant)

### 2. Golden Score Calculation
- 5 core facial ratios compared to φ (1.618)
- Gaussian decay scoring algorithm
- Face shape classification (Oval, Square, Round, etc.)

### 3. Celebrity Doppelgänger
- Vector similarity search using Pinecone
- Cosine similarity matching
- Database of celebrities and classical art figures

### 4. Personalized Style Guide
- Face-shape-specific eyewear recommendations
- Hairstyle suggestions
- General styling tips

### 5. No-Login Architecture
- Anonymous device-based identification
- 7-day auto-expiring scan history
- Full functionality without signup friction

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite |
| Face Detection | Google MediaPipe FaceMesh (WASM) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Vector Search | Pinecone |

## 📁 Project Structure

```
GoldenAI/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── analysis/            # Camera, Scanner, Mesh
│   │   │   ├── common/              # Navbar, Footer
│   │   │   └── results/             # ScoreCard, StylistCard, DoppelgangerCard
│   │   ├── pages/                   # Home, Analysis, About
│   │   ├── services/                # faceMesh, geometry, stylist, api
│   │   └── utils/                   # animations, helpers
│   ├── package.json
│   └── vite.config.js
├── server/                          # Node.js Backend
│   ├── src/
│   │   ├── config/                  # db, pinecone connections
│   │   ├── controllers/             # scan, match logic
│   │   ├── models/                  # Mongoose schemas
│   │   └── routes/                  # API routes
│   └── package.json
├── scripts/
│   └── seedCelebrities.js           # Pinecone population
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Pinecone account (free tier works)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yash23082007/GoldenAI.git
   cd GoldenAI
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**
   ```bash
   # In server directory, edit .env file
   cp .env.example .env
   # Add your MongoDB and Pinecone credentials
   ```

5. **Create Pinecone Index**
   - Go to Pinecone console
   - Create new index with:
     - Dimensions: `5`
     - Metric: `cosine`
     - Name: `goldenai-celebrities`

6. **Seed the celebrity database**
   ```bash
   cd scripts
   node seedCelebrities.js
   ```

7. **Start the development servers**
   
   Terminal 1 (Backend):
   ```bash
   cd server
   npm run dev
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd client
   npm run dev
   ```

8. **Open the app**
   ```
   http://localhost:5173
   ```

## ⚙️ Configuration

### Server Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/goldenai

# Pinecone
PINECONE_API_KEY=your-api-key
PINECONE_INDEX=goldenai-celebrities

# CORS
CORS_ORIGIN=http://localhost:5173
```

## 📐 The Mathematics

### The Golden Ratio (φ)

```
φ = (1 + √5) / 2 ≈ 1.618033988749895
```

### The 5 Core Ratios

| Ratio | Measurement | Ideal |
|-------|-------------|-------|
| Face Structure | Face Length / Face Width | φ (1.618) |
| Rule of Fifths | Inter-Eye Distance / Eye Width | 1.000 |
| Nasal-Oral | Mouth Width / Nose Width | φ (1.618) |
| Vertical Thirds | Forehead Height / Lower Face Height | 1.000 |
| Symmetry | Left Hemi-Face / Right Hemi-Face | 1.000 |

### Scoring Algorithm (Gaussian Decay)

```
Score = Σ (Weight_i × max(0, 100 × (1 - Sensitivity × |Actual - Target| / Target)))
```

### Vector Similarity (Doppelgänger)

```
Similarity(A, B) = (A · B) / (||A|| × ||B||)
```

## 📡 API Reference

### Health Check
```
GET /api/health
```

### Save Scan
```
POST /api/scans
Body: { deviceId, ratios, results }
```

### Get Device Scans
```
GET /api/scans/:deviceId
```

### Find Celebrity Match
```
POST /api/match
Body: { ratios }
```

### Get Global Stats
```
GET /api/stats
```

## 👨‍💻 Developer

**Yash Vijay**

- 🌐 GitHub: [@yash23082007](https://github.com/yash23082007)
- 💼 LinkedIn: [Yash Vijay](https://www.linkedin.com/in/yash-vijay-b0a75937a)
- 📸 Instagram: [@yash_vj23](https://www.instagram.com/yash_vj23)
- 📧 Email: ktanayash@gmail.com

---

<p align="center">
  <em>Built with geometry, not judgment.</em><br>
  <strong>φ ≈ 1.618</strong>
</p>
