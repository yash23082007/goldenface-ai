import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

/**
 * CameraFeed Component
 * Renders the webcam video feed for facial analysis
 */
const CameraFeed = forwardRef(({ onReady, className }, ref) => {
  const videoRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getVideoElement: () => videoRef.current,
  }));

  useEffect(() => {
    if (videoRef.current && onReady) {
      onReady(videoRef.current);
    }
  }, [onReady]);

  return (
    <video
      ref={videoRef}
      className={`transform scale-x-[-1] ${className || ''}`}
      playsInline
      muted
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
  );
});

CameraFeed.displayName = 'CameraFeed';

CameraFeed.propTypes = {
  onReady: PropTypes.func,
  className: PropTypes.string,
};

export default CameraFeed;
