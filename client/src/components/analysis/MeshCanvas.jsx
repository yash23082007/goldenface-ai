import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FACE_MESH_TESSELATION, FACE_MESH_CONTOURS } from '@mediapipe/face_mesh';

/**
 * MeshCanvas Component
 * Draws the 468-point face mesh overlay on a canvas
 */
const MeshCanvas = ({ landmarks, width, height, showMesh, showContours }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !landmarks) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    // Mirror the canvas to match mirrored video
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-width, 0);

    // Draw tesselation (mesh triangles)
    if (showMesh && FACE_MESH_TESSELATION) {
      ctx.strokeStyle = 'rgba(0, 200, 200, 0.2)';
      ctx.lineWidth = 0.5;

      for (const connection of FACE_MESH_TESSELATION) {
        const start = landmarks[connection[0]];
        const end = landmarks[connection[1]];
        if (start && end) {
          ctx.beginPath();
          ctx.moveTo(start.x * width, start.y * height);
          ctx.lineTo(end.x * width, end.y * height);
          ctx.stroke();
        }
      }
    }

    // Draw face contours
    if (showContours && FACE_MESH_CONTOURS) {
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.8)';
      ctx.lineWidth = 1.5;

      for (const connection of FACE_MESH_CONTOURS) {
        const start = landmarks[connection[0]];
        const end = landmarks[connection[1]];
        if (start && end) {
          ctx.beginPath();
          ctx.moveTo(start.x * width, start.y * height);
          ctx.lineTo(end.x * width, end.y * height);
          ctx.stroke();
        }
      }
    }

    // Draw landmark points
    ctx.fillStyle = 'rgba(0, 220, 220, 0.8)';
    for (let i = 0; i < landmarks.length; i++) {
      const point = landmarks[i];
      ctx.beginPath();
      ctx.arc(point.x * width, point.y * height, 1, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Draw key landmarks with larger points
    const keyPoints = [
      1, 33, 133, 362, 263, // Nose tip, eye corners
      61, 291, // Mouth corners
      10, 152, // Top and chin
    ];
    
    ctx.fillStyle = 'rgba(197, 160, 89, 1)';
    for (const idx of keyPoints) {
      const point = landmarks[idx];
      if (point) {
        ctx.beginPath();
        ctx.arc(point.x * width, point.y * height, 3, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    ctx.restore();
  }, [landmarks, width, height, showMesh, showContours]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

MeshCanvas.propTypes = {
  landmarks: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  showMesh: PropTypes.bool,
  showContours: PropTypes.bool,
};

MeshCanvas.defaultProps = {
  width: 640,
  height: 480,
  showMesh: true,
  showContours: true,
};

export default MeshCanvas;
