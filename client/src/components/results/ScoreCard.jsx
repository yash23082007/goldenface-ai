import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { fadeInUp, staggerContainer, progressBar } from '../../utils/animations';
import { getScoreColor, formatScore } from '../../utils/helpers';

/**
 * ScoreCard Component
 * Displays facial analysis scores with animated progress bars
 */
const ScoreCard = ({ scores, ratios, faceShape }) => {
  if (!scores) return null;

  const scoreItems = [
    { key: 'faceStructure', label: 'Face Structure', ideal: 'φ (1.618)' },
    { key: 'ruleOfFifths', label: 'Rule of Fifths', ideal: '1.000' },
    { key: 'nasalOral', label: 'Nasal-Oral Ratio', ideal: 'φ (1.618)' },
    { key: 'verticalThirds', label: 'Vertical Thirds', ideal: '1.000' },
    { key: 'symmetry', label: 'Symmetry', ideal: '1.000' },
  ];

  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      {/* Header with Total Score */}
      <div className="text-center mb-8">
        <motion.div
          className="inline-block"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        >
          <div className="relative w-32 h-32 mx-auto mb-4">
            {/* Circular progress background */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="8"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="#C5A059"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 56}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                animate={{
                  strokeDashoffset: 2 * Math.PI * 56 * (1 - scores.total / 100),
                }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
            </svg>
            {/* Score number */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className="text-3xl font-playfair text-graphite"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {formatScore(scores.total)}
              </motion.span>
              <span className="text-xs text-gray-500 font-manrope">out of 100</span>
            </div>
          </div>
        </motion.div>

        <h3 className="font-playfair text-2xl text-graphite mb-2">
          Golden Score
        </h3>
        
        {faceShape && (
          <motion.p
            className="text-gold font-manrope font-semibold"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            Face Shape: {faceShape}
          </motion.p>
        )}
      </div>

      {/* Individual Scores */}
      <motion.div
        className="space-y-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {scoreItems.map((item, index) => (
          <motion.div
            key={item.key}
            variants={fadeInUp}
            custom={index}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="font-manrope text-sm text-graphite">
                {item.label}
              </span>
              <div className="flex items-center gap-2">
                {ratios && (
                  <span className="text-xs text-gray-400 font-manrope">
                    {ratios[item.key]?.toFixed(2)} / {item.ideal}
                  </span>
                )}
                <span className={`font-semibold ${getScoreColor(scores.individual[item.key])}`}>
                  {formatScore(scores.individual[item.key])}
                </span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
                variants={progressBar}
                initial="initial"
                animate="animate"
                custom={scores.individual[item.key]}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

ScoreCard.propTypes = {
  scores: PropTypes.shape({
    total: PropTypes.number,
    individual: PropTypes.object,
  }),
  ratios: PropTypes.object,
  faceShape: PropTypes.string,
};

export default ScoreCard;
