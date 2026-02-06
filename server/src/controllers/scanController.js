import Scan from '../models/Scan.js';
import GlobalStat from '../models/GlobalStat.js';

/**
 * Save a new scan result
 * POST /api/scans
 */
export const createScan = async (req, res) => {
  try {
    const { deviceId, ratios, results } = req.body;

    // Validate required fields
    if (!deviceId || !ratios || !results) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: deviceId, ratios, results',
      });
    }

    // Create the scan document
    const scan = await Scan.create({
      deviceId,
      ratios,
      results,
    });

    // Update global statistics atomically
    await GlobalStat.recordScan(results.totalScore, results.faceShape);

    res.status(201).json({
      success: true,
      data: scan,
    });
  } catch (error) {
    console.error('Create scan error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save scan',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

/**
 * Get scans for a specific device
 * GET /api/scans/:deviceId
 */
export const getDeviceScans = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { limit = 10, page = 1 } = req.query;

    const scans = await Scan.find({ deviceId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('-__v');

    const total = await Scan.countDocuments({ deviceId });

    res.json({
      success: true,
      data: scans,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get device scans error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve scans',
    });
  }
};

/**
 * Get global statistics
 * GET /api/stats
 */
export const getGlobalStats = async (req, res) => {
  try {
    const stats = await GlobalStat.getStats();

    res.json({
      success: true,
      data: {
        totalScans: stats.totalScans,
        averageScore: Math.round(stats.averageScore * 10) / 10,
        shapeDistribution: stats.shapeDistribution,
        scoreDistribution: stats.scoreDistribution,
        lastUpdated: stats.lastUpdated,
      },
    });
  } catch (error) {
    console.error('Get global stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve statistics',
    });
  }
};

/**
 * Delete a specific scan (user privacy control)
 * DELETE /api/scans/:scanId
 */
export const deleteScan = async (req, res) => {
  try {
    const { scanId } = req.params;
    const { deviceId } = req.body;

    // Verify ownership before deletion
    const scan = await Scan.findOne({ _id: scanId, deviceId });
    
    if (!scan) {
      return res.status(404).json({
        success: false,
        message: 'Scan not found or unauthorized',
      });
    }

    await scan.deleteOne();

    res.json({
      success: true,
      message: 'Scan deleted successfully',
    });
  } catch (error) {
    console.error('Delete scan error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete scan',
    });
  }
};
