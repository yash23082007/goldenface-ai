import mongoose from 'mongoose';

/**
 * Scan Schema
 * Stores individual facial analysis scans with TTL for auto-deletion
 */
const scanSchema = new mongoose.Schema(
  {
    // Anonymous device identifier (UUID v4 from localStorage)
    deviceId: {
      type: String,
      required: [true, 'Device ID is required'],
      index: true,
    },

    // Calculated facial ratios
    ratios: {
      faceStructure: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
      ruleOfFifths: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
      nasalOral: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
      verticalThirds: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
      symmetry: {
        type: Number,
        required: true,
        min: 0,
        max: 2,
      },
    },

    // Analysis results
    results: {
      totalScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      faceShape: {
        type: String,
        enum: ['Oval', 'Square', 'Round', 'Oblong', 'Heart', 'Diamond'],
        required: true,
      },
      celebrityMatch: {
        name: String,
        similarity: Number,
        description: String,
      },
      recommendations: {
        eyewear: String,
        hairstyle: String,
        general: String,
      },
    },

    // Metadata
    createdAt: {
      type: Date,
      default: Date.now,
    },

    // TTL field - auto-delete after 7 days
    expireAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      index: { expires: 0 },
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient device-based queries
scanSchema.index({ deviceId: 1, createdAt: -1 });

const Scan = mongoose.model('Scan', scanSchema);

export default Scan;
