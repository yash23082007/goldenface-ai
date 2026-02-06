import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import About from './pages/About';
import './index.css';

/**
 * GoldenFaceAI - Privacy-First Biometric Analysis
 * Main Application Component
 */
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-alabaster font-manrope">
        <Navbar />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/analyze" element={<Analysis />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
