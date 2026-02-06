import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { fadeInUp } from '../../utils/animations';

/**
 * StylistCard Component
 * Displays personalized styling recommendations
 */
const StylistCard = ({ recommendations }) => {
  if (!recommendations) return null;

  const { faceShape, description, eyewear, hairstyle, general, personalizedTip } = recommendations;

  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          <h3 className="font-playfair text-xl text-graphite">Style Guide</h3>
          <p className="text-sm text-gray-500 font-manrope">For your {faceShape} face</p>
        </div>
      </div>

      {/* Description */}
      <motion.p
        className="text-gray-600 font-manrope mb-6 italic border-l-2 border-gold pl-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        "{description}"
      </motion.p>

      {/* Recommendations Grid */}
      <div className="space-y-6">
        {/* Eyewear */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <h4 className="font-manrope font-semibold text-graphite">Eyewear</h4>
          </div>
          
          <div className="pl-7 space-y-2">
            <div className="flex flex-wrap gap-2">
              {eyewear?.recommended?.map((item, idx) => (
                <span key={idx} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-manrope">
                  ✓ {item}
                </span>
              ))}
            </div>
            {eyewear?.avoid && (
              <div className="flex flex-wrap gap-2 mt-2">
                {eyewear.avoid.map((item, idx) => (
                  <span key={idx} className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-manrope">
                    ✗ {item}
                  </span>
                ))}
              </div>
            )}
            <p className="text-sm text-gray-500 mt-2">{eyewear?.tip}</p>
          </div>
        </motion.div>

        {/* Hairstyle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <h4 className="font-manrope font-semibold text-graphite">Hairstyle</h4>
          </div>
          
          <div className="pl-7 space-y-2">
            <div className="flex flex-wrap gap-2">
              {hairstyle?.recommended?.map((item, idx) => (
                <span key={idx} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-manrope">
                  ✓ {item}
                </span>
              ))}
            </div>
            {hairstyle?.avoid && (
              <div className="flex flex-wrap gap-2 mt-2">
                {hairstyle.avoid.map((item, idx) => (
                  <span key={idx} className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-manrope">
                    ✗ {item}
                  </span>
                ))}
              </div>
            )}
            <p className="text-sm text-gray-500 mt-2">{hairstyle?.tip}</p>
          </div>
        </motion.div>
      </div>

      {/* Personalized Tip */}
      {personalizedTip && (
        <motion.div
          className="mt-6 p-4 bg-gold/5 rounded-xl border border-gold/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-gold">💡</span>
            </div>
            <div>
              <h5 className="font-manrope font-semibold text-graphite text-sm mb-1">Personal Insight</h5>
              <p className="text-sm text-gray-600 font-manrope">{personalizedTip}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* General Advice */}
      {general && (
        <motion.p
          className="mt-6 text-sm text-gray-500 font-manrope text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {general}
        </motion.p>
      )}
    </motion.div>
  );
};

StylistCard.propTypes = {
  recommendations: PropTypes.shape({
    faceShape: PropTypes.string,
    description: PropTypes.string,
    eyewear: PropTypes.object,
    hairstyle: PropTypes.object,
    general: PropTypes.string,
    personalizedTip: PropTypes.string,
  }),
};

export default StylistCard;
