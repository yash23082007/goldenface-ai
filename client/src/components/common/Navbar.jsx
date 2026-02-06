import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { navbarAnimation } from '../../utils/animations';

/**
 * Navbar Component
 * Main navigation with golden ratio branding
 */
const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/analyze', label: 'Analyze' },
    { path: '/about', label: 'About' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-alabaster/80 backdrop-blur-md border-b border-gray-200/50"
      variants={navbarAnimation}
      initial="initial"
      animate="animate"
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-gold font-playfair text-lg">φ</span>
            </motion.div>
            <span className="font-playfair text-xl text-graphite group-hover:text-gold transition-colors">
              GoldenFaceAI
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative"
              >
                <span
                  className={`font-manrope text-sm transition-colors ${
                    isActive(link.path)
                      ? 'text-gold font-semibold'
                      : 'text-graphite/70 hover:text-graphite'
                  }`}
                >
                  {link.label}
                </span>
                {isActive(link.path) && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                    layoutId="navbar-indicator"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link to="/analyze">
            <motion.button
              className="px-5 py-2 bg-graphite text-alabaster rounded-full font-manrope text-sm hover:bg-gold transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Analysis
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
