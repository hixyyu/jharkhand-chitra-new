import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { useTheme } from './context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [view, setView] = useState('home'); // 'home' | 'admin'
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  // Simple clean state router based on URL hash or window navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/admin') {
        setView('admin');
      } else {
        setView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // initial load check
    handleHashChange();

    // Premium brand loader animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      clearTimeout(timer);
    };
  }, []);

  const navigateTo = (newView) => {
    if (newView === 'admin') {
      window.location.hash = '#/admin';
    } else {
      window.location.hash = '#/';
    }
    setView(newView);
  };

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-cream dark:bg-brand-espresso"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          {/* Decorative glowing background glow */}
          <div className="absolute w-72 h-72 rounded-full bg-brand-gold/10 blur-3xl" />
          
          <div className="relative text-center flex flex-col items-center">
            {/* Animated traditional-themed logo mark */}
            <motion.div
              className="text-4xl mb-4 text-brand-mocha dark:text-brand-cream"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              ✨
            </motion.div>
            
            <motion.h1
              className="font-serif text-3xl font-medium tracking-widest text-brand-mocha dark:text-brand-cream"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Jharkhand Chitra
            </motion.h1>
            
            <motion.p
              className="text-xs uppercase tracking-widest mt-2 text-brand-gold font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Handcrafted Premium Artistry
            </motion.p>
            
            {/* Elegant luxury infinite thin loader line */}
            <div className="w-32 h-[1px] bg-brand-mocha/10 dark:bg-brand-cream/10 mt-8 relative overflow-hidden rounded-full">
              <motion.div
                className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-brand-gold to-transparent"
                initial={{ left: '-100%', width: '50%' }}
                animate={{ left: '150%' }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          {view === 'admin' ? (
            <Admin onNavigateHome={() => navigateTo('home')} />
          ) : (
            <Home onNavigateAdmin={() => navigateTo('admin')} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
