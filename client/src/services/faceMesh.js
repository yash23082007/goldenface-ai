/**
 * MediaPipe FaceMesh Configuration
 * Uses globally loaded MediaPipe from CDN for reliable face detection
 */

let faceMeshInstance = null;
let cameraInstance = null;

/**
 * Initialize FaceMesh with configuration
 * @param {Function} onResults - Callback function to handle face detection results
 * @returns {Promise<Object>} Configured FaceMesh instance
 */
export const initFaceMesh = async (onResults) => {
  if (faceMeshInstance) {
    faceMeshInstance.close();
  }

  // Use global FaceMesh from CDN script
  const FaceMesh = window.FaceMesh;
  
  if (!FaceMesh) {
    throw new Error('FaceMesh not loaded. Please refresh the page.');
  }
  
  faceMeshInstance = new FaceMesh({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
    },
  });

  faceMeshInstance.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  faceMeshInstance.onResults(onResults);

  return faceMeshInstance;
};

/**
 * Initialize camera stream with FaceMesh processing
 * @param {HTMLVideoElement} videoElement - The video element to use
 * @param {Object} faceMesh - The initialized FaceMesh instance
 * @returns {Object} Camera instance
 */
export const initCamera = (videoElement, faceMesh) => {
  if (cameraInstance) {
    cameraInstance.stop();
  }

  // Use global Camera from CDN script
  const Camera = window.Camera;
  
  if (!Camera) {
    throw new Error('Camera utils not loaded. Please refresh the page.');
  }

  cameraInstance = new Camera(videoElement, {
    onFrame: async () => {
      if (faceMesh) {
        await faceMesh.send({ image: videoElement });
      }
    },
    width: 640,
    height: 480,
  });

  return cameraInstance;
};

/**
 * Start the camera
 * @param {Camera} camera - Camera instance to start
 */
export const startCamera = async (camera) => {
  try {
    await camera.start();
    console.log('📸 Camera started successfully');
    return true;
  } catch (error) {
    console.error('Failed to start camera:', error);
    return false;
  }
};

/**
 * Stop the camera and cleanup resources
 */
export const stopCamera = () => {
  if (cameraInstance) {
    cameraInstance.stop();
    cameraInstance = null;
  }
  if (faceMeshInstance) {
    faceMeshInstance.close();
    faceMeshInstance = null;
  }
};

/**
 * Key landmark indices for facial analysis
 * Based on MediaPipe's 468 landmark model
 */
export const LANDMARKS = {
  // Face contour
  FACE_OVAL: [
    10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288,
    397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136,
    172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109,
  ],
  
  // Eyes
  LEFT_EYE_OUTER: 33,
  LEFT_EYE_INNER: 133,
  RIGHT_EYE_INNER: 362,
  RIGHT_EYE_OUTER: 263,
  LEFT_PUPIL: 468, // Requires refineLandmarks
  RIGHT_PUPIL: 473, // Requires refineLandmarks
  
  // Eyebrows
  LEFT_EYEBROW_TOP: 105,
  RIGHT_EYEBROW_TOP: 334,
  
  // Nose
  NOSE_TIP: 1,
  NOSE_BOTTOM: 2,
  NOSE_LEFT: 129,
  NOSE_RIGHT: 358,
  
  // Mouth
  MOUTH_LEFT: 61,
  MOUTH_RIGHT: 291,
  UPPER_LIP_TOP: 0,
  LOWER_LIP_BOTTOM: 17,
  
  // Chin
  CHIN: 152,
  
  // Forehead (approximated)
  FOREHEAD_TOP: 10,
  
  // Cheekbones (zygomatic)
  LEFT_CHEEKBONE: 234,
  RIGHT_CHEEKBONE: 454,
  
  // Jawline
  JAW_LEFT: 172,
  JAW_RIGHT: 397,
};

/**
 * Extract specific landmarks from results
 * @param {Object} results - MediaPipe results object
 * @returns {Object|null} Extracted landmark coordinates
 */
export const extractLandmarks = (results) => {
  if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
    return null;
  }

  const landmarks = results.multiFaceLandmarks[0];
  
  return {
    // Eyes
    leftEyeOuter: landmarks[LANDMARKS.LEFT_EYE_OUTER],
    leftEyeInner: landmarks[LANDMARKS.LEFT_EYE_INNER],
    rightEyeInner: landmarks[LANDMARKS.RIGHT_EYE_INNER],
    rightEyeOuter: landmarks[LANDMARKS.RIGHT_EYE_OUTER],
    
    // Nose
    noseTip: landmarks[LANDMARKS.NOSE_TIP],
    noseBottom: landmarks[LANDMARKS.NOSE_BOTTOM],
    noseLeft: landmarks[LANDMARKS.NOSE_LEFT],
    noseRight: landmarks[LANDMARKS.NOSE_RIGHT],
    
    // Mouth
    mouthLeft: landmarks[LANDMARKS.MOUTH_LEFT],
    mouthRight: landmarks[LANDMARKS.MOUTH_RIGHT],
    upperLip: landmarks[LANDMARKS.UPPER_LIP_TOP],
    lowerLip: landmarks[LANDMARKS.LOWER_LIP_BOTTOM],
    
    // Face structure
    chin: landmarks[LANDMARKS.CHIN],
    foreheadTop: landmarks[LANDMARKS.FOREHEAD_TOP],
    leftCheekbone: landmarks[LANDMARKS.LEFT_CHEEKBONE],
    rightCheekbone: landmarks[LANDMARKS.RIGHT_CHEEKBONE],
    jawLeft: landmarks[LANDMARKS.JAW_LEFT],
    jawRight: landmarks[LANDMARKS.JAW_RIGHT],
    
    // Full landmarks for mesh drawing
    all: landmarks,
  };
};

export { faceMeshInstance, cameraInstance };
