import mongoose from 'mongoose';

/**
 * GlobalStat Schema (Singleton Pattern)
 * Stores aggregate analytics for the entire application
 * Uses a fixed _id to ensure only one document exists
 */
const globalStatSchema = new mongoose.Schema(
  {
    // Fixed ID for singleton pattern
    _id: {
      type: String,
      default: 'global_tracker',
    },

    // Total number of scans performed
    totalScans: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Running average score
    averageScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // Sum of all scores (for calculating rolling average)
    scoreSum: {
      type: Number,
      default: 0,
    },

    // Distribution of face shapes
    shapeDistribution: {
      Oval: { type: Number, default: 0 },
      Square: { type: Number, default: 0 },
      Round: { type: Number, default: 0 },
      Oblong: { type: Number, default: 0 },
      Heart: { type: Number, default: 0 },
      Diamond: { type: Number, default: 0 },
    },

    // Score distribution buckets
    scoreDistribution: {
      '0-20': { type: Number, default: 0 },
      '21-40': { type: Number, default: 0 },
      '41-60': { type: Number, default: 0 },
      '61-80': { type: Number, default: 0 },
      '81-100': { type: Number, default: 0 },
    },

    // Last updated timestamp
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Static method to get or create the singleton document
 */
globalStatSchema.statics.getStats = async function () {
  let stats = await this.findById('global_tracker');
  if (!stats) {
    stats = await this.create({ _id: 'global_tracker' });
  }
  return stats;
};

/**
 * Static method to update stats atomically
 * @param {number} score - The new scan score
 * @param {string} faceShape - The detected face shape
 */
globalStatSchema.statics.recordScan = async function (score, faceShape) {
  const scoreBucket = getScoreBucket(score);
  
  const update = {
    $inc: {
      totalScans: 1,
      scoreSum: score,
      [`shapeDistribution.${faceShape}`]: 1,
      [`scoreDistribution.${scoreBucket}`]: 1,
    },
    $set: {
      lastUpdated: new Date(),
    },
  };

  const stats = await this.findByIdAndUpdate(
    'global_tracker',
    update,
    { new: true, upsert: true }
  );

  // Recalculate average
  if (stats.totalScans > 0) {
    stats.averageScore = stats.scoreSum / stats.totalScans;
    await stats.save();
  }

  return stats;
};

/**
 * Helper function to determine score bucket
 */
function getScoreBucket(score) {
  if (score <= 20) return '0-20';
  if (score <= 40) return '21-40';
  if (score <= 60) return '41-60';
  if (score <= 80) return '61-80';
  return '81-100';
}

const GlobalStat = mongoose.model('GlobalStat', globalStatSchema);

export default GlobalStat;
