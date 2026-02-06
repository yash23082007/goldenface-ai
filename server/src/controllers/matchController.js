import { querySimilar } from '../config/pinecone.js';

/**
 * Find celebrity doppelgänger based on facial ratios
 * POST /api/match
 */
export const findMatch = async (req, res) => {
  try {
    const { ratios, topK = 3 } = req.body;

    // Validate ratios
    if (!ratios || typeof ratios !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Missing or invalid ratios object',
      });
    }

    const { faceStructure, ruleOfFifths, nasalOral, verticalThirds, symmetry } = ratios;

    // Validate all ratio values exist
    if ([faceStructure, ruleOfFifths, nasalOral, verticalThirds, symmetry].some(v => v === undefined)) {
      return res.status(400).json({
        success: false,
        message: 'All ratio values required: faceStructure, ruleOfFifths, nasalOral, verticalThirds, symmetry',
      });
    }

    // Create the 5-dimensional vector
    const vector = [
      faceStructure,
      ruleOfFifths,
      nasalOral,
      verticalThirds,
      symmetry,
    ];

    // Query Pinecone for similar vectors
    const matches = await querySimilar(vector, topK);

    if (matches.length === 0) {
      return res.json({
        success: true,
        data: {
          matches: [],
          message: 'No matches found. The database may not be seeded yet.',
        },
      });
    }

    // Format response with similarity percentages
    const formattedMatches = matches.map((match, index) => ({
      rank: index + 1,
      name: match.name,
      similarity: Math.round(match.score * 100),
      description: match.description,
      advice: match.advice,
      imageUrl: match.imageUrl,
    }));

    res.json({
      success: true,
      data: {
        topMatch: formattedMatches[0],
        allMatches: formattedMatches,
        userVector: vector,
      },
    });
  } catch (error) {
    console.error('Match finding error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to find matches',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

/**
 * Get match health/status
 * GET /api/match/health
 */
export const getMatchHealth = async (req, res) => {
  try {
    // Test query with a neutral vector
    const testVector = [1.618, 1.0, 1.618, 1.0, 1.0];
    const matches = await querySimilar(testVector, 1);

    res.json({
      success: true,
      data: {
        pineconeStatus: matches.length > 0 ? 'connected' : 'empty',
        vectorDimensions: 5,
        sampleMatchCount: matches.length,
      },
    });
  } catch (error) {
    res.json({
      success: false,
      data: {
        pineconeStatus: 'disconnected',
        error: error.message,
      },
    });
  }
};
