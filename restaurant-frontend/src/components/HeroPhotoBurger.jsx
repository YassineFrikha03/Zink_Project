// src/components/HeroPhotoBurger.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const HeroPhotoBurger = () => {
  const [hoveredHotspot, setHoveredHotspot] = useState(null);

  const hotspots = [
    {
      id: 'top-bun',
      top: '22%',
      left: '58%',
      name: 'Pain Brioché Artisanal',
      desc: 'Pétri et doré chaque matin par notre artisan boulanger.',
      price: '3.50 DT',
      img: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=200&q=80',
      align: 'right'
    },
    {
      id: 'meat-cheese',
      top: '55%',
      left: '30%',
      name: 'Steak Pur Angus & Cheddar',
      desc: 'Viande noble maturée saisie au grill & cheddar affiné coulant.',
      price: '19.00 DT',
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=200&q=80',
      align: 'left'
    },
    {
      id: 'sauce-veg',
      top: '72%',
      left: '70%',
      name: 'Sauce Secrète Zink',
      desc: 'Sauce signature maison, tomates fraîches du verger.',
      price: '4.50 DT',
      img: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=200&q=80',
      align: 'right'
    }
  ];

  return (
    <div className="relative w-full flex flex-col items-center justify-center min-h-[460px] sm:min-h-[520px] select-none py-4">
      
      {/* Lueur d'ambiance sous la photo du burger */}
      <div className="absolute w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] bg-gradient-to-tr from-[#F59E0B]/30 via-amber-600/15 to-transparent rounded-full blur-[90px] -z-10 pointer-events-none" />

      {/* =========================================================
          CONTENEUR DU BURGER (PHOTO HD AVEC HOTSPOTS)
      ========================================================= */}
      <div className="relative w-full flex flex-col items-center justify-center transition-all duration-500">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
          transition={{ 
            opacity: { duration: 0.4 },
            scale: { duration: 0.5, ease: "easeOut" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative w-72 sm:w-96 lg:w-[440px] h-72 sm:h-96 lg:h-[440px] flex items-center justify-center"
        >
          {/* Photo HD Ultra-réaliste du Burger Gourmet */}
          <div className="relative w-full h-full rounded-full overflow-visible flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=95"
              alt="Burger Gourmet Fait Maison Photo HD"
              className="w-full h-full object-contain filter drop-shadow-[0_28px_35px_rgba(0,0,0,0.85)] hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Effet de brume / vapeur chaude discrète autour de la viande */}
            <motion.div 
              animate={{ opacity: [0.2, 0.45, 0.2], y: [0, -15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 left-1/3 w-32 h-16 bg-white/10 rounded-full blur-xl pointer-events-none"
            />

            {/* INTERACTIVE HOTSPOTS */}
            {hotspots.map((spot) => (
              <div 
                key={spot.id}
                className="absolute z-30"
                style={{ top: spot.top, left: spot.left }}
                onMouseEnter={() => setHoveredHotspot(spot.id)}
                onMouseLeave={() => setHoveredHotspot(null)}
              >
                {/* Le point brillant (Hotspot) */}
                <div className="relative flex items-center justify-center w-8 h-8 cursor-pointer group">
                  <div className="absolute inset-0 bg-[#F59E0B] rounded-full animate-ping opacity-70 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-6 h-6 bg-black border-2 border-[#F59E0B] rounded-full flex items-center justify-center shadow-[0_0_15px_#F59E0B] group-hover:scale-110 transition-transform">
                    <Plus size={14} className="text-[#F59E0B] group-hover:rotate-90 transition-transform duration-300" />
                  </div>
                </div>

                {/* Tooltip Glassmorphic (Apparaît au survol) */}
                <AnimatePresence>
                  {hoveredHotspot === spot.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, x: spot.align === 'left' ? 20 : -20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.8, x: spot.align === 'left' ? 10 : -10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute top-1/2 -translate-y-1/2 ${spot.align === 'left' ? 'right-full mr-4' : 'left-full ml-4'} w-64 bg-[#181820]/80 backdrop-blur-xl border border-white/10 hover:border-[#F59E0B]/50 rounded-2xl p-3 shadow-2xl pointer-events-none z-40`}
                    >
                      <div className="flex gap-3 items-center">
                        <img src={spot.img} alt={spot.name} className="w-14 h-14 rounded-xl object-cover border border-white/5 shrink-0" />
                        <div>
                          <h5 className="text-[11px] font-heading font-black uppercase text-white leading-tight mb-1">{spot.name}</h5>
                          <p className="text-[9px] text-gray-400 leading-tight line-clamp-2">{spot.desc}</p>
                          <span className="inline-block mt-1 text-[10px] font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-1.5 py-0.5 rounded">{spot.price}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            
          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default HeroPhotoBurger;
