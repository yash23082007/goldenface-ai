import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { fadeInUp } from '../../utils/animations';

/**
 * DoppelgangerCard Component
 * Displays the celebrity match result
 */
const DoppelgangerCard = ({ match, isLoading }) => {
  if (isLoading) {
    return (
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-gray-200 rounded-xl" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </motion.div>
    );
  }

  if (!match) {
    return (
      <motion.div
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="font-playfair text-xl text-graphite mb-2">Doppelgänger</h3>
          <p className="text-gray-500 font-manrope text-sm">
            Complete the analysis to find your geometric twin
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 overflow-hidden"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h3 className="font-playfair text-xl text-graphite">Your Geometric Twin</h3>
          <p className="text-sm text-gray-500 font-manrope">Based on vector similarity</p>
        </div>
      </div>

      {/* Match Card */}
      <motion.div
        className="bg-gradient-to-br from-alabaster to-gray-50 rounded-xl p-6 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
      >
        {/* Avatar placeholder */}
        <div className="w-24 h-24 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
          {match.imageUrl ? (
            <img 
              src={match.imageUrl} 
              alt={match.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-4xl text-gold font-playfair">
              {match.name?.charAt(0) || '?'}
            </span>
          )}
        </div>

        {/* Name */}
        <h4 className="font-playfair text-2xl text-graphite mb-1">
          {match.name}
        </h4>

        {/* Similarity score */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full mb-4">
          <span className="text-gold font-manrope font-semibold">
            {match.similarity}%
          </span>
          <span className="text-gray-500 font-manrope text-sm">
            similarity
          </span>
        </div>

        {/* Description */}
        {match.description && (
          <p className="text-gray-600 font-manrope text-sm mb-4">
            "{match.description}"
          </p>
        )}

        {/* Advice */}
        {match.advice && (
          <div className="bg-white rounded-lg p-3 border border-gray-100">
            <p className="text-sm text-gray-500 font-manrope">
              <span className="text-gold">Signature Style:</span> {match.advice}
            </p>
          </div>
        )}
      </motion.div>

      {/* Fun fact */}
      <motion.p
        className="mt-4 text-center text-xs text-gray-400 font-manrope"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Matched using 5-dimensional cosine similarity
      </motion.p>
    </motion.div>
  );
};

DoppelgangerCard.propTypes = {
  match: PropTypes.shape({
    name: PropTypes.string,
    similarity: PropTypes.number,
    description: PropTypes.string,
    advice: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
};

export default DoppelgangerCard;
