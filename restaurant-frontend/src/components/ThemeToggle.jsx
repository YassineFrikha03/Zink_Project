// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = ({ isNavbarVariant = false }) => {
  const [isLight, setIsLight] = useState(() => {
    return localStorage.getItem('zink_theme') === 'light';
  });

  useEffect(() => {
    if (isLight) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [isLight]);

  const toggleTheme = () => {
    const nextTheme = !isLight;
    setIsLight(nextTheme);
    localStorage.setItem('zink_theme', nextTheme ? 'light' : 'dark');
    if (nextTheme) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  };

  if (isNavbarVariant) {
    return (
      <button
        onClick={toggleTheme}
        className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#F59E0B]/50 transition-all flex items-center justify-center group relative text-gray-300 hover:text-[#F59E0B]"
        title={isLight ? 'Passer en mode Sombre (Dark)' : 'Passer en mode Clair (Light)'}
        aria-label="Changer le thème du site"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isLight ? 'sun' : 'moon'}
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isLight ? (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
            ) : (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[#F59E0B]" />
            )}
          </motion.div>
        </AnimatePresence>
      </button>
    );
  }

  // Version Bouton Flottant Global (présent sur toutes les pages en bas à gauche)
  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleTheme}
        className={`flex items-center gap-2.5 px-4 py-3 rounded-full font-extrabold text-xs tracking-wide transition-all shadow-2xl backdrop-blur-xl border ${
          isLight
            ? 'bg-white/95 text-slate-900 border-amber-500/40 shadow-amber-500/10 hover:bg-white hover:border-amber-500'
            : 'bg-[#181824]/90 text-white border-white/15 shadow-black/80 hover:border-[#F59E0B]/60 hover:bg-[#1E1E2C]'
        }`}
        title={isLight ? 'Désactiver le mode clair' : 'Activer le mode clair'}
      >
        <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
          isLight ? 'bg-amber-100 text-amber-600' : 'bg-[#F59E0B]/20 text-[#F59E0B]'
        }`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isLight ? 'sun-float' : 'moon-float'}
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 90, scale: 0 }}
              transition={{ duration: 0.25 }}
            >
              {isLight ? <Moon className="w-4 h-4 text-indigo-600" /> : <Sun className="w-4 h-4 text-[#F59E0B]" />}
            </motion.div>
          </AnimatePresence>
        </div>
        <span className="hidden sm:inline-block">
          {isLight ? '🌙 Mode Sombre' : '☀️ Mode Clair'}
        </span>
      </motion.button>
    </div>
  );
};

export default ThemeToggle;
