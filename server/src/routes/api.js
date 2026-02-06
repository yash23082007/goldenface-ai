import express from 'express';
import {
  createScan,
  getDeviceScans,
  getGlobalStats,
  deleteScan,
} from '../controllers/scanController.js';
import { findMatch, getMatchHealth } from '../controllers/matchController.js';

const router = express.Router();

// ============================================
// HEALTH CHECK
// ============================================
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'GoldenFaceAI API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// ============================================
// SCAN ROUTES
// ============================================
// Create a new scan
router.post('/scans', createScan);

// Get scans for a device
router.get('/scans/:deviceId', getDeviceScans);

// Delete a specific scan
router.delete('/scans/:scanId', deleteScan);

// ============================================
// STATISTICS ROUTES
// ============================================
// Get global statistics
router.get('/stats', getGlobalStats);

// ============================================
// MATCH/DOPPELGÄNGER ROUTES
// ============================================
// Find celebrity match
router.post('/match', findMatch);

// Match service health check
router.get('/match/health', getMatchHealth);

export default router;
