import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageVariants, fadeInUp, staggerContainer, pulseAnimation } from '../utils/animations';

/**
 * Home Page
 * Minimalist hero section with "Discover Your Geometry" call to action
 */
const Home = () => {
  return (
    <motion.div
      className="min-h-screen bg-alabaster"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Golden Ratio Symbol */}
          <motion.div
            className="mb-8"
            variants={fadeInUp}
          >
            <motion.div
              className="w-24 h-24 mx-auto border-2 border-gold rounded-full flex items-center justify-center"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <span className="text-gold font-playfair text-4xl">φ</span>
            </motion.div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="font-playfair text-5xl md:text-7xl text-graphite mb-6 leading-tight"
            variants={fadeInUp}
          >
            Discover Your
            <br />
            <span className="text-gold">Geometry</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-manrope text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Privacy-first facial analysis using the Golden Ratio (φ ≈ 1.618). 
            All processing happens on your device. No images leave your browser.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={fadeInUp}>
            <Link to="/analyze">
              <motion.button
                className="relative px-10 py-4 bg-graphite text-alabaster rounded-full font-manrope text-lg hover:bg-gold transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                {...pulseAnimation}
              >
                <span className="relative z-10">Begin Analysis</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-500 font-manrope"
            variants={fadeInUp}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>100% Private</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>No Account Required</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="font-playfair text-3xl md:text-4xl text-graphite text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Capture',
                description: 'Your webcam maps 468 facial landmarks using Google MediaPipe, running entirely in your browser.',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'Calculate',
                description: 'Our Geometry Engine computes 5 key facial ratios and compares them to the Golden Ratio (φ).',
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                title: 'Discover',
                description: 'Get your Golden Score, face shape analysis, celebrity doppelgänger, and personalized style tips.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center p-8 rounded-2xl hover:bg-alabaster transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 text-gold">
                  {feature.icon}
                </div>
                <h3 className="font-playfair text-xl text-graphite mb-3">{feature.title}</h3>
                <p className="font-manrope text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-6 bg-alabaster">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-6xl text-gold/30 font-playfair mb-4">"</div>
          <p className="font-playfair text-2xl text-graphite italic mb-6">
            Beauty is harmony. Harmony is mathematics. Mathematics is φ.
          </p>
          <p className="font-manrope text-gray-500 text-sm">— The Golden Principle</p>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
