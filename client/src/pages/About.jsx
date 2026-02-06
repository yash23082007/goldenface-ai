import { motion } from 'framer-motion';
import { pageVariants, fadeInUp, staggerContainer } from '../utils/animations';
import { PHI, IDEAL_RATIOS } from '../services/geometry';

/**
 * About Page
 * Technical whitepaper explaining the mathematics and methodology
 */
const About = () => {
  const ratioData = [
    { name: 'Face Structure', measurement: 'Face Length / Face Width', ideal: 'φ (1.618)' },
    { name: 'Rule of Fifths', measurement: 'Inter-Eye Distance / Eye Width', ideal: '1.000' },
    { name: 'Nasal-Oral', measurement: 'Mouth Width / Nose Width', ideal: 'φ (1.618)' },
    { name: 'Vertical Thirds', measurement: 'Forehead Height / Lower Face Height', ideal: '1.000' },
    { name: 'Symmetry', measurement: 'Left Hemi-Face / Right Hemi-Face', ideal: '1.000' },
  ];

  return (
    <motion.div
      className="min-h-screen bg-alabaster pt-24 pb-12"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="w-20 h-20 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-8"
            variants={fadeInUp}
          >
            <span className="text-gold font-playfair text-3xl">φ</span>
          </motion.div>
          <motion.h1
            className="font-playfair text-4xl md:text-5xl text-graphite mb-6"
            variants={fadeInUp}
          >
            The Science of Beauty
          </motion.h1>
          <motion.p
            className="font-manrope text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            GoldenFaceAI doesn't use AI to "guess" beauty. It uses explicit Euclidean Geometry 
            to quantify facial proportions against mathematical ideals that have defined 
            aesthetics for millennia.
          </motion.p>
        </div>
      </section>

      {/* Golden Ratio Section */}
      <section className="px-6 py-16" id="math">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="font-playfair text-3xl text-graphite mb-8 text-center"
            variants={fadeInUp}
          >
            The Golden Ratio
          </motion.h2>

          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg mb-8"
            variants={fadeInUp}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="font-manrope text-gray-600 leading-relaxed mb-4">
                  The Golden Ratio (φ, phi) is a mathematical constant approximately equal to 1.618. 
                  It appears throughout nature, art, and architecture as a fundamental principle of 
                  aesthetic harmony.
                </p>
                <p className="font-manrope text-gray-600 leading-relaxed">
                  From the spirals of galaxies to the proportions of the Parthenon, from Leonardo's 
                  Vitruvian Man to modern design systems, φ represents the mathematical foundation 
                  of visual balance.
                </p>
              </div>
              <div className="text-center bg-alabaster rounded-xl p-8">
                <div className="font-playfair text-6xl text-gold mb-4">φ</div>
                <div className="font-manrope text-2xl text-graphite mb-2">≈ 1.618033988749895</div>
                <div className="text-sm text-gray-500 font-manrope">
                  The Divine Proportion
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mathematical Formula */}
          <motion.div
            className="bg-graphite text-alabaster rounded-2xl p-8 mb-8"
            variants={fadeInUp}
          >
            <h3 className="font-playfair text-xl mb-4">The Mathematical Definition</h3>
            <div className="bg-white/10 rounded-lg p-6 text-center font-mono">
              <div className="text-2xl mb-4">
                φ = (1 + √5) / 2
              </div>
              <div className="text-sm text-gray-300">
                Where φ satisfies the equation: φ² = φ + 1
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The 5 Ratios Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="font-playfair text-3xl text-graphite mb-8 text-center"
            variants={fadeInUp}
          >
            The 5 Core Ratios
          </motion.h2>

          <motion.p
            className="font-manrope text-gray-600 text-center mb-12 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            We analyze these specific facial proportions using MediaPipe's 468 landmark model:
          </motion.p>

          <motion.div
            className="overflow-x-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-playfair text-graphite">Ratio</th>
                  <th className="text-left py-4 px-4 font-playfair text-graphite">Measurement</th>
                  <th className="text-center py-4 px-4 font-playfair text-graphite">Ideal</th>
                </tr>
              </thead>
              <tbody>
                {ratioData.map((ratio, index) => (
                  <motion.tr
                    key={ratio.name}
                    className="border-b border-gray-100"
                    variants={fadeInUp}
                    custom={index}
                  >
                    <td className="py-4 px-4 font-manrope font-semibold text-graphite">{ratio.name}</td>
                    <td className="py-4 px-4 font-manrope text-gray-600 text-sm">{ratio.measurement}</td>
                    <td className="py-4 px-4 text-center">
                      <span className="px-3 py-1 bg-gold/10 text-gold rounded-full font-manrope text-sm font-semibold">
                        {ratio.ideal}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Scoring Algorithm Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="font-playfair text-3xl text-graphite mb-8 text-center"
            variants={fadeInUp}
          >
            The Scoring Algorithm
          </motion.h2>

          <motion.div
            className="bg-white rounded-2xl p-8 shadow-lg mb-8"
            variants={fadeInUp}
          >
            <h3 className="font-playfair text-xl text-graphite mb-4">Gaussian Decay</h3>
            <p className="font-manrope text-gray-600 mb-6">
              We don't use linear percentage. Deviating slightly from the Golden Ratio is normal; 
              deviating significantly is penalized exponentially. This better reflects how human 
              perception works.
            </p>

            <div className="bg-alabaster rounded-xl p-6 text-center font-mono text-sm overflow-x-auto">
              <div className="text-graphite">
                Score = Σ (Weight<sub>i</sub> × max(0, 100 × (1 - Sensitivity × |Actual - Target| / Target)))
              </div>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-alabaster rounded-lg">
                <div className="font-playfair text-lg text-gold">Sensitivity</div>
                <div className="font-manrope text-sm text-gray-600">= 3.0</div>
              </div>
              <div className="p-4 bg-alabaster rounded-lg">
                <div className="font-playfair text-lg text-gold">Weights</div>
                <div className="font-manrope text-sm text-gray-600">15% - 25%</div>
              </div>
              <div className="p-4 bg-alabaster rounded-lg">
                <div className="font-playfair text-lg text-gold">Range</div>
                <div className="font-manrope text-sm text-gray-600">0 - 100</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vector Search Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="font-playfair text-3xl text-graphite mb-8 text-center"
            variants={fadeInUp}
          >
            Doppelgänger Logic
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-alabaster rounded-2xl p-6"
              variants={fadeInUp}
            >
              <h3 className="font-playfair text-lg text-graphite mb-4">Vector Embedding</h3>
              <p className="font-manrope text-gray-600 text-sm mb-4">
                Your 5 facial ratios are flattened into a vector:
              </p>
              <div className="bg-white rounded-lg p-4 font-mono text-sm text-center">
                V = [1.61, 1.00, 1.58, 1.02, 0.99]
              </div>
            </motion.div>

            <motion.div
              className="bg-alabaster rounded-2xl p-6"
              variants={fadeInUp}
            >
              <h3 className="font-playfair text-lg text-graphite mb-4">Cosine Similarity</h3>
              <p className="font-manrope text-gray-600 text-sm mb-4">
                We find the nearest match using:
              </p>
              <div className="bg-white rounded-lg p-4 font-mono text-sm text-center">
                Sim(A, B) = (A · B) / (||A|| × ||B||)
              </div>
            </motion.div>
          </motion.div>

          <motion.p
            className="font-manrope text-gray-500 text-center mt-8 text-sm"
            variants={fadeInUp}
          >
            Powered by Pinecone Vector Database
          </motion.p>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="bg-graphite text-alabaster rounded-2xl p-8"
            variants={fadeInUp}
          >
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="font-playfair text-2xl mb-4">Privacy-First Architecture</h2>
            <p className="font-manrope text-gray-300 max-w-2xl mx-auto">
              All facial detection and analysis happens entirely on your device using WebAssembly. 
              No raw images are ever sent to our servers. We only receive the calculated ratio 
              numbers (5 decimal values) for the vector search feature.
            </p>
            <div className="flex justify-center gap-8 mt-8 text-sm">
              <div>
                <div className="text-gold font-semibold">0</div>
                <div className="text-gray-400">Images uploaded</div>
              </div>
              <div>
                <div className="text-gold font-semibold">100%</div>
                <div className="text-gray-400">Client-side ML</div>
              </div>
              <div>
                <div className="text-gold font-semibold">7 days</div>
                <div className="text-gray-400">Data auto-deletion</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="font-playfair text-3xl text-graphite mb-12"
            variants={fadeInUp}
          >
            Technology Stack
          </motion.h2>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { name: 'React', desc: 'Frontend' },
              { name: 'Node.js', desc: 'Backend' },
              { name: 'MongoDB', desc: 'Database' },
              { name: 'Pinecone', desc: 'Vector DB' },
              { name: 'MediaPipe', desc: 'Face Mesh' },
              { name: 'Framer Motion', desc: 'Animation' },
              { name: 'Tailwind CSS', desc: 'Styling' },
              { name: 'Vite', desc: 'Build Tool' },
            ].map((tech) => (
              <motion.div
                key={tech.name}
                className="p-4 bg-alabaster rounded-xl"
                variants={fadeInUp}
              >
                <div className="font-manrope font-semibold text-graphite">{tech.name}</div>
                <div className="text-xs text-gray-500">{tech.desc}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
