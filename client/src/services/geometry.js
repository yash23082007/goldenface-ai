/**
 * GoldenAI Geometry Engine
 * Mathematical analysis of facial proportions based on the Golden Ratio (φ ≈ 1.618)
 */

// The Golden Ratio constant
export const PHI = 1.618033988749895;

// Ideal ratio targets
export const IDEAL_RATIOS = {
  faceStructure: PHI,      // Face length / Face width = φ
  ruleOfFifths: 1.0,       // Inter-eye distance / Eye width = 1
  nasalOral: PHI,          // Mouth width / Nose width = φ
  verticalThirds: 1.0,     // Forehead height / Lower face height = 1
  symmetry: 1.0,           // Left hemi-face / Right hemi-face = 1
};

// Weights for each ratio in final score calculation
const RATIO_WEIGHTS = {
  faceStructure: 0.25,
  ruleOfFifths: 0.20,
  nasalOral: 0.20,
  verticalThirds: 0.15,
  symmetry: 0.20,
};

// Sensitivity factor for Gaussian decay (higher = more strict)
const SENSITIVITY = 3.0;

/**
 * Calculate Euclidean distance between two 3D points
 * @param {Object} p1 - Point with x, y, z coordinates
 * @param {Object} p2 - Point with x, y, z coordinates
 * @returns {number} Distance between points
 */
export const distance3D = (p1, p2) => {
  return Math.sqrt(
    Math.pow(p2.x - p1.x, 2) +
    Math.pow(p2.y - p1.y, 2) +
    Math.pow(p2.z - p1.z, 2)
  );
};

/**
 * Calculate 2D distance (ignoring depth)
 * More stable for front-facing analysis
 */
export const distance2D = (p1, p2) => {
  return Math.sqrt(
    Math.pow(p2.x - p1.x, 2) +
    Math.pow(p2.y - p1.y, 2)
  );
};

/**
 * Calculate all facial ratios from extracted landmarks
 * @param {Object} landmarks - Extracted landmark coordinates
 * @returns {Object} Calculated ratios
 */
export const calculateRatios = (landmarks) => {
  if (!landmarks) return null;

  // 1. FACE STRUCTURE RATIO (Face Length / Face Width)
  // Face length: Forehead top to Chin
  // Face width: Cheekbone to Cheekbone (Zygomatic width)
  const faceLength = distance2D(landmarks.foreheadTop, landmarks.chin);
  const faceWidth = distance2D(landmarks.leftCheekbone, landmarks.rightCheekbone);
  const faceStructure = faceLength / faceWidth;

  // 2. RULE OF FIFTHS (Inter-Eye Distance / Eye Width)
  // Inter-eye: Inner corner to inner corner
  // Eye width: Outer to inner of one eye
  const interEyeDistance = distance2D(landmarks.leftEyeInner, landmarks.rightEyeInner);
  const leftEyeWidth = distance2D(landmarks.leftEyeOuter, landmarks.leftEyeInner);
  const rightEyeWidth = distance2D(landmarks.rightEyeOuter, landmarks.rightEyeInner);
  const avgEyeWidth = (leftEyeWidth + rightEyeWidth) / 2;
  const ruleOfFifths = interEyeDistance / avgEyeWidth;

  // 3. NASAL-ORAL RATIO (Mouth Width / Nose Width)
  const mouthWidth = distance2D(landmarks.mouthLeft, landmarks.mouthRight);
  const noseWidth = distance2D(landmarks.noseLeft, landmarks.noseRight);
  const nasalOral = mouthWidth / noseWidth;

  // 4. VERTICAL THIRDS (Forehead Height / Lower Face Height)
  // Forehead: Top to eyebrow level (approximated by nose bridge)
  // Lower face: Nose bottom to chin
  const foreheadHeight = distance2D(landmarks.foreheadTop, landmarks.noseTip);
  const lowerFaceHeight = distance2D(landmarks.noseBottom, landmarks.chin);
  const verticalThirds = foreheadHeight / lowerFaceHeight;

  // 5. SYMMETRY (Left Hemi-Face / Right Hemi-Face)
  // Compare distances from center line
  const centerX = (landmarks.noseTip.x + landmarks.chin.x) / 2;
  const leftDistance = Math.abs(landmarks.leftCheekbone.x - centerX);
  const rightDistance = Math.abs(landmarks.rightCheekbone.x - centerX);
  const symmetry = Math.min(leftDistance, rightDistance) / Math.max(leftDistance, rightDistance);

  return {
    faceStructure: roundTo(faceStructure, 3),
    ruleOfFifths: roundTo(ruleOfFifths, 3),
    nasalOral: roundTo(nasalOral, 3),
    verticalThirds: roundTo(verticalThirds, 3),
    symmetry: roundTo(symmetry, 3),
  };
};

/**
 * Calculate individual score for a ratio using Gaussian decay
 * @param {number} actual - The measured ratio
 * @param {number} ideal - The target ideal ratio
 * @returns {number} Score from 0-100
 */
export const calculateRatioScore = (actual, ideal) => {
  const deviation = Math.abs(actual - ideal) / ideal;
  const score = Math.max(0, 100 * (1 - SENSITIVITY * deviation));
  return roundTo(score, 1);
};

/**
 * Calculate the total weighted score
 * @param {Object} ratios - Calculated facial ratios
 * @returns {Object} Individual scores and total score
 */
export const calculateTotalScore = (ratios) => {
  if (!ratios) return null;

  const scores = {
    faceStructure: calculateRatioScore(ratios.faceStructure, IDEAL_RATIOS.faceStructure),
    ruleOfFifths: calculateRatioScore(ratios.ruleOfFifths, IDEAL_RATIOS.ruleOfFifths),
    nasalOral: calculateRatioScore(ratios.nasalOral, IDEAL_RATIOS.nasalOral),
    verticalThirds: calculateRatioScore(ratios.verticalThirds, IDEAL_RATIOS.verticalThirds),
    symmetry: calculateRatioScore(ratios.symmetry, IDEAL_RATIOS.symmetry),
  };

  // Calculate weighted total
  const totalScore =
    scores.faceStructure * RATIO_WEIGHTS.faceStructure +
    scores.ruleOfFifths * RATIO_WEIGHTS.ruleOfFifths +
    scores.nasalOral * RATIO_WEIGHTS.nasalOral +
    scores.verticalThirds * RATIO_WEIGHTS.verticalThirds +
    scores.symmetry * RATIO_WEIGHTS.symmetry;

  return {
    individual: scores,
    total: roundTo(totalScore, 1),
  };
};

/**
 * Determine face shape based on ratios
 * @param {Object} ratios - Calculated facial ratios
 * @returns {string} Face shape classification
 */
export const determineFaceShape = (ratios) => {
  if (!ratios) return 'Unknown';

  const { faceStructure, verticalThirds } = ratios;

  // Classification based on length-to-width ratio
  if (faceStructure >= 1.55 && faceStructure <= 1.68) {
    return 'Oval'; // Near golden ratio
  } else if (faceStructure < 1.35) {
    return 'Round'; // Wide face
  } else if (faceStructure < 1.55) {
    return 'Square'; // Moderately proportioned
  } else if (faceStructure > 1.75) {
    return 'Oblong'; // Long face
  } else if (verticalThirds > 1.15) {
    return 'Heart'; // Large forehead
  } else {
    return 'Diamond'; // Default/angular
  }
};

/**
 * Create a vector for Pinecone similarity search
 * @param {Object} ratios - Calculated facial ratios
 * @returns {number[]} 5-dimensional vector
 */
export const createRatioVector = (ratios) => {
  if (!ratios) return null;
  
  return [
    ratios.faceStructure,
    ratios.ruleOfFifths,
    ratios.nasalOral,
    ratios.verticalThirds,
    ratios.symmetry,
  ];
};

/**
 * Helper function to round numbers
 */
const roundTo = (num, decimals) => {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

/**
 * Get ratio comparison to ideal
 * @param {Object} ratios - Calculated ratios
 * @returns {Object} Comparison data for UI display
 */
export const getRatioComparison = (ratios) => {
  if (!ratios) return null;

  return Object.keys(IDEAL_RATIOS).map(key => ({
    name: formatRatioName(key),
    actual: ratios[key],
    ideal: IDEAL_RATIOS[key],
    deviation: roundTo(Math.abs(ratios[key] - IDEAL_RATIOS[key]), 3),
    deviationPercent: roundTo((Math.abs(ratios[key] - IDEAL_RATIOS[key]) / IDEAL_RATIOS[key]) * 100, 1),
  }));
};

/**
 * Format ratio key name for display
 */
const formatRatioName = (key) => {
  const names = {
    faceStructure: 'Face Structure',
    ruleOfFifths: 'Rule of Fifths',
    nasalOral: 'Nasal-Oral',
    verticalThirds: 'Vertical Thirds',
    symmetry: 'Symmetry',
  };
  return names[key] || key;
};
