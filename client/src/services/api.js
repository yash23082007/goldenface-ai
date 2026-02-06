import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add device ID to all requests if available
    const deviceId = localStorage.getItem('goldenai_device_id');
    if (deviceId) {
      config.headers['X-Device-ID'] = deviceId;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error.response?.data || error);
  }
);

/**
 * Save a scan result to the database
 * @param {Object} scanData - The scan data to save
 */
export const saveScan = async (scanData) => {
  return api.post('/scans', scanData);
};

/**
 * Get scans for the current device
 * @param {string} deviceId - The device identifier
 * @param {Object} options - Pagination options
 */
export const getDeviceScans = async (deviceId, options = {}) => {
  const { limit = 10, page = 1 } = options;
  return api.get(`/scans/${deviceId}`, { params: { limit, page } });
};

/**
 * Delete a specific scan
 * @param {string} scanId - The scan ID to delete
 * @param {string} deviceId - The device ID for verification
 */
export const deleteScan = async (scanId, deviceId) => {
  return api.delete(`/scans/${scanId}`, { data: { deviceId } });
};

/**
 * Get global statistics
 */
export const getGlobalStats = async () => {
  return api.get('/stats');
};

/**
 * Find celebrity match based on ratios
 * @param {Object} ratios - The calculated facial ratios
 */
export const findCelebrityMatch = async (ratios) => {
  return api.post('/match', { ratios });
};

/**
 * Check API health
 */
export const checkHealth = async () => {
  return api.get('/health');
};

export default api;
