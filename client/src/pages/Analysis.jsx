import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { pageVariants, fadeInUp } from '../utils/animations';
import { initFaceMesh, initCamera, startCamera, stopCamera, extractLandmarks } from '../services/faceMesh';
import { calculateRatios, calculateTotalScore, determineFaceShape, createRatioVector } from '../services/geometry';
import { generateStyleReport } from '../services/stylist';
import { saveScan, findCelebrityMatch } from '../services/api';
import { getDeviceId, storeScanLocally } from '../utils/helpers';

import CameraFeed from '../components/analysis/CameraFeed';
import ScannerOverlay from '../components/analysis/ScannerOverlay';
import MeshCanvas from '../components/analysis/MeshCanvas';
import ScoreCard from '../components/results/ScoreCard';
import StylistCard from '../components/results/StylistCard';
import DoppelgangerCard from '../components/results/DoppelgangerCard';

/**
 * Analysis Page
 * Main facial analysis interface with camera feed and results
 */
const Analysis = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [status, setStatus] = useState('Initializing...');
  const [error, setError] = useState(null);
  const [landmarks, setLandmarks] = useState(null);
  const [results, setResults] = useState(null);
  const [celebrityMatch, setCelebrityMatch] = useState(null);
  const [isMatchLoading, setIsMatchLoading] = useState(false);

  const cameraRef = useRef(null);
  const faceMeshRef = useRef(null);
  const cameraInstanceRef = useRef(null);
  const analysisIntervalRef = useRef(null);
  const ratioBufferRef = useRef([]);

  // Handle face detection results
  const onResults = useCallback((faceResults) => {
    const extracted = extractLandmarks(faceResults);
    if (extracted) {
      setLandmarks(extracted.all);
      
      // Buffer ratios for stability (average over multiple frames)
      const ratios = calculateRatios(extracted);
      if (ratios) {
        ratioBufferRef.current.push(ratios);
        if (ratioBufferRef.current.length > 10) {
          ratioBufferRef.current.shift();
        }
      }
    } else {
      setLandmarks(null);
    }
  }, []);

  // Initialize camera and face mesh
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        setStatus('Loading face detection model...');
        faceMeshRef.current = await initFaceMesh(onResults);
        await faceMeshRef.current.initialize();
        
        if (!mounted) return;
        setStatus('Ready. Click "Start Scan" to begin.');
        setIsLoading(false);
      } catch (err) {
        console.error('Initialization error:', err);
        setError('Failed to load face detection. Please refresh and allow camera access.');
        setIsLoading(false);
      }
    };

    init();

    return () => {
      mounted = false;
      stopCamera();
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
      }
    };
  }, [onResults]);

  // Start scanning
  const handleStartScan = async () => {
    try {
      setError(null);
      setStatus('Requesting camera access...');
      setIsScanning(true);

      const videoElement = cameraRef.current?.getVideoElement();
      if (!videoElement) {
        throw new Error('Video element not found');
      }

      cameraInstanceRef.current = initCamera(videoElement, faceMeshRef.current);
      const success = await startCamera(cameraInstanceRef.current);

      if (!success) {
        throw new Error('Camera access denied');
      }

      setStatus('Analyzing facial geometry...');
      ratioBufferRef.current = [];

      // Run analysis after collecting frames
      analysisIntervalRef.current = setTimeout(() => {
        performAnalysis();
      }, 3000);

    } catch (err) {
      console.error('Scan error:', err);
      setError(err.message);
      setIsScanning(false);
      setStatus('Ready. Click "Start Scan" to begin.');
    }
  };

  // Perform the analysis
  const performAnalysis = async () => {
    try {
      setStatus('Calculating ratios...');

      // Average the buffered ratios for stability
      if (ratioBufferRef.current.length < 5) {
        setError('Could not detect face properly. Please ensure good lighting and face the camera directly.');
        setIsScanning(false);
        setStatus('Ready. Click "Start Scan" to try again.');
        return;
      }

      const avgRatios = {};
      const keys = Object.keys(ratioBufferRef.current[0]);
      keys.forEach(key => {
        const sum = ratioBufferRef.current.reduce((acc, r) => acc + r[key], 0);
        avgRatios[key] = sum / ratioBufferRef.current.length;
      });

      // Calculate scores
      const scores = calculateTotalScore(avgRatios);
      const faceShape = determineFaceShape(avgRatios);
      const styleReport = generateStyleReport(faceShape, avgRatios, scores);

      const analysisResults = {
        ratios: avgRatios,
        scores,
        faceShape,
        recommendations: styleReport,
      };

      setResults(analysisResults);
      setStatus('Analysis complete!');

      // Find celebrity match
      setIsMatchLoading(true);
      try {
        const matchResponse = await findCelebrityMatch(avgRatios);
        if (matchResponse.success && matchResponse.data.topMatch) {
          setCelebrityMatch(matchResponse.data.topMatch);
        }
      } catch (matchErr) {
        console.warn('Celebrity match failed:', matchErr);
        // Non-critical, continue without match
      }
      setIsMatchLoading(false);

      // Save scan (non-blocking)
      const deviceId = getDeviceId();
      try {
        await saveScan({
          deviceId,
          ratios: avgRatios,
          results: {
            totalScore: scores.total,
            faceShape,
            celebrityMatch: celebrityMatch?.name || null,
            recommendations: {
              eyewear: styleReport.eyewear?.recommended?.[0] || '',
              hairstyle: styleReport.hairstyle?.recommended?.[0] || '',
              general: styleReport.general || '',
            },
          },
        });
      } catch (saveErr) {
        console.warn('Failed to save scan to server:', saveErr);
      }

      // Store locally
      storeScanLocally({
        ...analysisResults,
        deviceId,
        timestamp: new Date().toISOString(),
      });

    } catch (err) {
      console.error('Analysis error:', err);
      setError('Analysis failed. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  // Stop scanning
  const handleStopScan = () => {
    stopCamera();
    if (analysisIntervalRef.current) {
      clearTimeout(analysisIntervalRef.current);
    }
    setIsScanning(false);
    setStatus('Scan stopped. Click "Start Scan" to begin again.');
    setLandmarks(null);
  };

  // Reset for new scan
  const handleNewScan = () => {
    setResults(null);
    setCelebrityMatch(null);
    setLandmarks(null);
    setStatus('Ready. Click "Start Scan" to begin.');
    ratioBufferRef.current = [];
  };

  return (
    <motion.div
      className="min-h-screen bg-alabaster pt-24 pb-12 px-6"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={fadeInUp}
        >
          <h1 className="font-playfair text-4xl text-graphite mb-4">
            Facial Analysis
          </h1>
          <p className="font-manrope text-gray-600 max-w-2xl mx-auto">
            Position your face within the frame. Ensure good lighting and look directly at the camera.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Camera Section */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
            variants={fadeInUp}
          >
            {/* Camera Feed */}
            <div className="relative aspect-[4/3] bg-graphite">
              <CameraFeed ref={cameraRef} className="absolute inset-0" />
              <ScannerOverlay isScanning={isScanning} status={status} />
              {landmarks && (
                <MeshCanvas
                  landmarks={landmarks}
                  width={640}
                  height={480}
                  showMesh={true}
                  showContours={true}
                />
              )}

              {/* Loading overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-graphite/90 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full mx-auto mb-4"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <p className="text-alabaster font-manrope">{status}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="p-6 border-t border-gray-100">
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-manrope">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                {!results ? (
                  <>
                    <motion.button
                      className={`flex-1 py-3 rounded-lg font-manrope font-semibold transition-colors ${
                        isScanning
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-gold text-white hover:bg-gold-dark'
                      }`}
                      onClick={isScanning ? handleStopScan : handleStartScan}
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isScanning ? 'Stop Scan' : 'Start Scan'}
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    className="flex-1 py-3 rounded-lg font-manrope font-semibold bg-graphite text-white hover:bg-gold transition-colors"
                    onClick={handleNewScan}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    New Scan
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {results ? (
                <>
                  <ScoreCard
                    key="scorecard"
                    scores={results.scores}
                    ratios={results.ratios}
                    faceShape={results.faceShape}
                  />
                  <DoppelgangerCard
                    key="doppelganger"
                    match={celebrityMatch}
                    isLoading={isMatchLoading}
                  />
                  <StylistCard
                    key="stylist"
                    recommendations={results.recommendations}
                  />
                </>
              ) : (
                <motion.div
                  key="placeholder"
                  className="bg-white rounded-2xl p-12 shadow-lg border border-gray-100 text-center"
                  variants={fadeInUp}
                >
                  <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-playfair text-2xl text-graphite mb-3">Ready to Analyze</h3>
                  <p className="font-manrope text-gray-500 mb-6">
                    Click "Start Scan" to begin your facial geometry analysis.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 font-manrope">
                    <span>✓ 468 landmark detection</span>
                    <span>✓ Golden ratio scoring</span>
                    <span>✓ Style recommendations</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analysis;
