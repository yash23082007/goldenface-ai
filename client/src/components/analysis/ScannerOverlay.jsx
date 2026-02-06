import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { breathingAnimation } from '../../utils/animations';

/**
 * ScannerOverlay Component
 * Displays the "breathing" golden frame over the camera feed
 */
const ScannerOverlay = ({ isScanning, status }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Corner brackets */}
      <motion.div
        className="absolute inset-8"
        {...(isScanning ? breathingAnimation : {})}
      >
        {/* Top Left Corner */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-gold" />
        
        {/* Top Right Corner */}
        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold" />
        
        {/* Bottom Left Corner */}
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-gold" />
        
        {/* Bottom Right Corner */}
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-gold" />
      </motion.div>

      {/* Center crosshair */}
      {isScanning && (
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-8 h-8 relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gold opacity-50" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gold opacity-50" />
          </div>
        </motion.div>
      )}

      {/* Status indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <motion.div
          className={`px-4 py-2 rounded-full backdrop-blur-sm ${
            isScanning 
              ? 'bg-gold/20 border border-gold/40' 
              : 'bg-graphite/20 border border-gray-400/40'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className={`w-2 h-2 rounded-full ${
                isScanning ? 'bg-gold' : 'bg-gray-400'
              }`}
              animate={isScanning ? {
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
            <span className={`text-sm font-manrope ${
              isScanning ? 'text-gold' : 'text-gray-400'
            }`}>
              {status || (isScanning ? 'Analyzing...' : 'Ready')}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scanning lines animation */}
      {isScanning && (
        <>
          <motion.div
            className="absolute left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
            initial={{ top: '15%' }}
            animate={{ top: ['15%', '85%', '15%'] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </>
      )}
    </div>
  );
};

ScannerOverlay.propTypes = {
  isScanning: PropTypes.bool,
  status: PropTypes.string,
};

ScannerOverlay.defaultProps = {
  isScanning: false,
  status: '',
};

export default ScannerOverlay;
