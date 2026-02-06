/**
 * GoldenAI Stylist Engine
 * Generates personalized styling recommendations based on facial geometry
 */

/**
 * Face shape styling recommendations database
 */
const STYLE_DATABASE = {
  Oval: {
    description: 'The balanced classic. Your face has naturally harmonious proportions.',
    eyewear: {
      recommended: ['Aviators', 'Wayfarers', 'Cat-eye', 'Round frames'],
      avoid: ['Oversized frames that overwhelm'],
      tip: 'You have universal compatibility - most frame shapes complement your balanced proportions.',
    },
    hairstyle: {
      recommended: ['Side part', 'Slicked back', 'Textured layers', 'Classic pompadour'],
      avoid: ['Styles that add excessive height or width'],
      tip: 'Your face shape is the most versatile. Experiment freely with length and volume.',
    },
    general: 'Your proportions align closely with the Golden Ratio. Focus on enhancing your natural balance rather than correcting asymmetries.',
  },

  Square: {
    description: 'Strong and defined. Angular features project confidence and power.',
    eyewear: {
      recommended: ['Round frames', 'Oval glasses', 'Browline frames'],
      avoid: ['Square or rectangular frames', 'Angular geometric shapes'],
      tip: 'Curved frames soften your angular jaw and create visual balance.',
    },
    hairstyle: {
      recommended: ['Textured fringe', 'Side-swept styles', 'Soft waves', 'Layered cuts'],
      avoid: ['Blunt cuts', 'Flat tops', 'Slicked-back styles'],
      tip: 'Add texture and movement to soften your strong angles. Side parts work better than center parts.',
    },
    general: 'Your defined jawline is a powerful feature. Balance it with softer elements in your styling choices.',
  },

  Round: {
    description: 'Soft and approachable. Curved features convey warmth and youthfulness.',
    eyewear: {
      recommended: ['Rectangular frames', 'Angular shapes', 'Wayfarers', 'D-frame glasses'],
      avoid: ['Round frames', 'Small oval glasses'],
      tip: 'Angular frames add definition and create the illusion of a longer face.',
    },
    hairstyle: {
      recommended: ['Volume on top', 'Pompadour', 'Quiff', 'Angular fringes'],
      avoid: ['Bob cuts', 'Rounded styles', 'Side-parted flat styles'],
      tip: 'Height on top elongates your face. Avoid styles that add width at the sides.',
    },
    general: 'Create vertical lines and angles to add structure. Embrace your approachable features while adding definition.',
  },

  Oblong: {
    description: 'Elegant and distinguished. Your vertical proportions convey sophistication.',
    eyewear: {
      recommended: ['Wide frames', 'Thick-rimmed glasses', 'Aviators', 'Wraparound styles'],
      avoid: ['Small narrow frames', 'Rectangular glasses'],
      tip: 'Wider frames break the vertical line and add horizontal balance.',
    },
    hairstyle: {
      recommended: ['Side-swept bangs', 'Layered styles', 'Textured fringes', 'Medium length cuts'],
      avoid: ['Very long hair', 'High-volume top styles', 'Slicked back'],
      tip: 'Horizontal lines and volume at the sides create balance. Consider a fringe to shorten the visual length.',
    },
    general: 'Break the vertical emphasis with horizontal elements. Strategic styling can create the illusion of a more balanced proportion.',
  },

  Heart: {
    description: 'Dynamic and expressive. Your prominent forehead signals intelligence and creativity.',
    eyewear: {
      recommended: ['Bottom-heavy frames', 'Light-colored frames', 'Rimless glasses', 'Cat-eye'],
      avoid: ['Top-heavy frames', 'Decorative browlines'],
      tip: 'Draw attention downward with frames that have weight at the bottom.',
    },
    hairstyle: {
      recommended: ['Side-swept styles', 'Chin-length layers', 'Textured bangs', 'Volume at jaw level'],
      avoid: ['Short styles that expose forehead', 'Excessive height on top'],
      tip: 'Add fullness around your jawline to balance your wider forehead. Side-swept bangs work excellently.',
    },
    general: 'Balance your forehead prominence by adding visual weight to your lower face through strategic styling.',
  },

  Diamond: {
    description: 'Striking and unique. Your angular cheekbones create dramatic definition.',
    eyewear: {
      recommended: ['Oval frames', 'Cat-eye glasses', 'Rimless styles', 'Browline frames'],
      avoid: ['Narrow frames', 'Angular geometric shapes'],
      tip: 'Frames that are wider than your cheekbones create balance and soften angles.',
    },
    hairstyle: {
      recommended: ['Side-swept bangs', 'Chin-length styles', 'Textured layers', 'Full styles'],
      avoid: ['Slicked-back styles', 'Center parts', 'Very short cuts'],
      tip: 'Add width at forehead and chin level. Fringes and layers work well to balance your cheekbones.',
    },
    general: 'Your angular cheekbones are distinctive. Balance them by adding fullness to your narrower forehead and chin areas.',
  },
};

/**
 * Symmetry-based recommendations
 */
const SYMMETRY_RECOMMENDATIONS = {
  high: { // > 0.95
    description: 'Your facial symmetry is exceptional.',
    tip: 'Centered hairstyles and symmetric accessories complement your balanced features.',
  },
  medium: { // 0.85 - 0.95
    description: 'Your facial symmetry is within the attractive range.',
    tip: 'Slight asymmetric styling can add character and interest to your look.',
  },
  low: { // < 0.85
    description: 'Embrace your unique asymmetry - it adds character.',
    tip: 'Side parts and asymmetric styles can strategically balance your features.',
  },
};

/**
 * Get comprehensive styling recommendations
 * @param {string} faceShape - Detected face shape
 * @param {Object} ratios - Calculated facial ratios
 * @returns {Object} Full styling recommendations
 */
export const getStyleRecommendations = (faceShape, ratios) => {
  const shapeData = STYLE_DATABASE[faceShape] || STYLE_DATABASE.Oval;
  
  // Get symmetry-based recommendations
  let symmetryLevel = 'medium';
  if (ratios?.symmetry > 0.95) symmetryLevel = 'high';
  else if (ratios?.symmetry < 0.85) symmetryLevel = 'low';
  
  const symmetryData = SYMMETRY_RECOMMENDATIONS[symmetryLevel];

  return {
    faceShape,
    description: shapeData.description,
    eyewear: shapeData.eyewear,
    hairstyle: shapeData.hairstyle,
    general: shapeData.general,
    symmetry: symmetryData,
  };
};

/**
 * Get a quick summary recommendation
 * @param {string} faceShape - Detected face shape
 * @returns {Object} Quick tips
 */
export const getQuickTips = (faceShape) => {
  const data = STYLE_DATABASE[faceShape] || STYLE_DATABASE.Oval;
  
  return {
    eyewear: data.eyewear.recommended[0],
    hairstyle: data.hairstyle.recommended[0],
    keyTip: data.eyewear.tip,
  };
};

/**
 * Generate a personalized style report
 * @param {string} faceShape - Detected face shape
 * @param {Object} ratios - Calculated ratios
 * @param {Object} scores - Calculated scores
 * @returns {Object} Complete style report
 */
export const generateStyleReport = (faceShape, ratios, scores) => {
  const recommendations = getStyleRecommendations(faceShape, ratios);
  
  // Determine the user's strongest feature
  const strongestFeature = Object.entries(scores?.individual || {})
    .sort(([, a], [, b]) => b - a)[0];
  
  // Determine area for potential improvement
  const improvementArea = Object.entries(scores?.individual || {})
    .sort(([, a], [, b]) => a - b)[0];

  return {
    ...recommendations,
    analysis: {
      strongestFeature: strongestFeature ? {
        name: formatFeatureName(strongestFeature[0]),
        score: strongestFeature[1],
      } : null,
      improvementArea: improvementArea ? {
        name: formatFeatureName(improvementArea[0]),
        score: improvementArea[1],
      } : null,
    },
    personalizedTip: generatePersonalizedTip(faceShape, scores),
  };
};

/**
 * Generate a personalized tip based on scores
 */
const generatePersonalizedTip = (faceShape, scores) => {
  if (!scores?.total) return 'Complete the analysis for personalized tips.';
  
  if (scores.total >= 90) {
    return 'Your proportions are remarkably close to classical ideals. Focus on maintaining your natural appearance.';
  } else if (scores.total >= 75) {
    return 'Your facial geometry is highly harmonious. Minor styling adjustments can enhance your natural features.';
  } else if (scores.total >= 60) {
    return 'You have good foundational proportions. Strategic styling can significantly enhance your overall appearance.';
  } else {
    return 'Your unique features tell a story. Embrace asymmetry and use styling to express your individuality.';
  }
};

/**
 * Format feature names for display
 */
const formatFeatureName = (key) => {
  const names = {
    faceStructure: 'Face Structure',
    ruleOfFifths: 'Eye Spacing',
    nasalOral: 'Mouth-Nose Ratio',
    verticalThirds: 'Vertical Balance',
    symmetry: 'Facial Symmetry',
  };
  return names[key] || key;
};

export { STYLE_DATABASE };
