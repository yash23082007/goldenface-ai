/**
 * Framer Motion Animation Configurations
 * "Human" feeling animations with spring physics
 */

// Spring configuration for natural movement
export const springConfig = {
  type: 'spring',
  mass: 1,
  stiffness: 100,
  damping: 15,
};

// Smoother spring for subtle movements
export const softSpring = {
  type: 'spring',
  mass: 0.5,
  stiffness: 80,
  damping: 12,
};

// Snappy spring for quick interactions
export const snappySpring = {
  type: 'spring',
  mass: 0.3,
  stiffness: 200,
  damping: 20,
};

/**
 * Page transition variants
 */
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: springConfig,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 },
  },
};

/**
 * Fade in from bottom (for cards and sections)
 */
export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 40,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: springConfig,
  },
};

/**
 * Stagger children animation
 */
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/**
 * Scale in animation (for buttons, icons)
 */
export const scaleIn = {
  initial: {
    scale: 0.8,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: snappySpring,
  },
};

/**
 * Hover animations
 */
export const hoverScale = {
  whileHover: {
    scale: 1.05,
    transition: softSpring,
  },
  whileTap: {
    scale: 0.95,
  },
};

export const hoverLift = {
  whileHover: {
    y: -5,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    transition: softSpring,
  },
};

/**
 * Breathing animation for the scanner frame
 */
export const breathingAnimation = {
  animate: {
    scale: [1, 1.02, 1],
    opacity: [1, 0.9, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Pulse animation for buttons
 */
export const pulseAnimation = {
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(197, 160, 89, 0.4)',
      '0 0 0 20px rgba(197, 160, 89, 0)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeOut',
    },
  },
};

/**
 * Progress bar animation
 */
export const progressBar = {
  initial: { width: 0 },
  animate: (width) => ({
    width: `${width}%`,
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  }),
};

/**
 * Mesh point animation (for face mesh overlay)
 */
export const meshPointAnimation = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/**
 * Score counter animation
 */
export const countUp = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

/**
 * Card flip animation
 */
export const cardFlip = {
  initial: {
    rotateY: 90,
    opacity: 0,
  },
  animate: {
    rotateY: 0,
    opacity: 1,
    transition: springConfig,
  },
};

/**
 * Slide in from left
 */
export const slideInLeft = {
  initial: {
    x: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: springConfig,
  },
};

/**
 * Slide in from right
 */
export const slideInRight = {
  initial: {
    x: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: springConfig,
  },
};

/**
 * Navbar animation
 */
export const navbarAnimation = {
  initial: {
    y: -100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ...springConfig,
      delay: 0.2,
    },
  },
};

/**
 * Footer animation
 */
export const footerAnimation = {
  initial: {
    y: 50,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ...springConfig,
      delay: 0.3,
    },
  },
};
