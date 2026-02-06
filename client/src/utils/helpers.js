import { v4 as uuidv4 } from 'uuid';

/**
 * Device ID Management
 * Handles anonymous device identification for no-login architecture
 */

const DEVICE_ID_KEY = 'goldenai_device_id';
const SCAN_HISTORY_KEY = 'goldenai_scan_history';

/**
 * Get or create a device ID
 * @returns {string} The device UUID
 */
export const getDeviceId = () => {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  
  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
    console.log('🔑 New device ID generated:', deviceId.substring(0, 8) + '...');
  }
  
  return deviceId;
};

/**
 * Store scan result locally
 * @param {Object} scanResult - The scan result to store
 */
export const storeScanLocally = (scanResult) => {
  const history = getLocalScanHistory();
  history.unshift({
    ...scanResult,
    storedAt: new Date().toISOString(),
  });
  
  // Keep only last 50 scans locally
  const trimmed = history.slice(0, 50);
  localStorage.setItem(SCAN_HISTORY_KEY, JSON.stringify(trimmed));
};

/**
 * Get local scan history
 * @returns {Array} Array of stored scan results
 */
export const getLocalScanHistory = () => {
  try {
    const history = localStorage.getItem(SCAN_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
};

/**
 * Clear local scan history
 */
export const clearLocalHistory = () => {
  localStorage.removeItem(SCAN_HISTORY_KEY);
};

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format score for display
 * @param {number} score - Score value
 * @returns {string} Formatted score with one decimal
 */
export const formatScore = (score) => {
  return score?.toFixed(1) || '0.0';
};

/**
 * Get score color based on value
 * @param {number} score - Score value (0-100)
 * @returns {string} Tailwind color class
 */
export const getScoreColor = (score) => {
  if (score >= 85) return 'text-green-500';
  if (score >= 70) return 'text-gold';
  if (score >= 50) return 'text-yellow-500';
  return 'text-red-400';
};

/**
 * Get score background gradient
 * @param {number} score - Score value (0-100)
 * @returns {string} Gradient CSS
 */
export const getScoreGradient = (score) => {
  if (score >= 85) return 'from-green-400 to-emerald-500';
  if (score >= 70) return 'from-gold to-gold-light';
  if (score >= 50) return 'from-yellow-400 to-amber-500';
  return 'from-red-400 to-rose-500';
};
