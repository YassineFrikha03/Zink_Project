// src/components/RealBurgerViewer.jsx
// ===================================================================
//  BURGER RÉEL 2.5D — PHOTOS STUDIO EMPILÉES
// ===================================================================
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers3, Minimize2 } from 'lucide-react';

import imgBunTop    from '../assets/ingredients/bun-top.png';
import imgBunBottom from '../assets/ingredients/bun-bottom.png';
import imgMeat      from '../assets/ingredients/meat.png';
import imgCheese    from '../assets/ingredients/cheese.png';
import imgLettuce   from '../assets/ingredients/lettuce.png';
import imgTomato    from '../assets/ingredients/tomato.png';
import imgOnion     from '../assets/ingredients/onion.png';
import imgBacon     from '../assets/ingredients/bacon.png';
import imgPickles   from '../assets/ingredients/pickles.png';
import imgSauce     from '../assets/ingredients/sauce.png';
import imgEgg       from '../assets/ingredients/egg.png';
import imgAvocado   from '../assets/ingredients/avocado.png';
import imgChicken   from '../assets/ingredients/chicken.png';

// ===================================================================
//  CONFIG PAR INGRÉDIENT
//  w    : largeur de l'image dans le burger (px, fixe)
//  h    : hauteur de la "tranche" visible (px) — détermine l'empilement
//  gap  : décalage vertical entre deux couches en mode assemblé
// ===================================================================
const getCfg = (layer) => {
  const id = layer.id || '';
  const n  = (layer.name || '').toLowerCase();

  if (layer.isTopBun    || id.includes('bun-top'))
    return { img: imgBunTop,    w: 300, gap: 80,  brightness: 1.0  };
  if (layer.isBottomBun || id.includes('bun-bottom'))
    return { img: imgBunBottom, w: 290, gap: 55,  brightness: 0.9  };

  if (n.includes('poulet') || n.includes('chicken'))
    return { img: imgChicken,   w: 280, gap: 55,  brightness: 1.05 };
  if (n.includes('steak') || n.includes('haché') || n.includes('double') || n.includes('veggie') || n.includes('galette'))
    return { img: imgMeat,      w: 280, gap: 52,  brightness: 1.0  };

  if (n.includes('cheddar') || n.includes('fromage') || n.includes('raclette') || n.includes('chèvre'))
    return { img: imgCheese,    w: 300, gap: 28,  brightness: 1.1  };

  if (n.includes('laitue') || n.includes('salade'))
    return { img: imgLettuce,   w: 320, gap: 34,  brightness: 1.05 };
  if (n.includes('tomate'))
    return { img: imgTomato,    w: 280, gap: 32,  brightness: 1.05 };
  if (n.includes('oignon'))
    return { img: imgOnion,     w: 260, gap: 28,  brightness: 1.0  };
  if (n.includes('cornichon') || n.includes('jalap'))
    return { img: imgPickles,   w: 260, gap: 22,  brightness: 1.0  };
  if (n.includes('avocat'))
    return { img: imgAvocado,   w: 270, gap: 28,  brightness: 1.05 };

  if (n.includes('bacon'))
    return { img: imgBacon,     w: 290, gap: 22,  brightness: 1.05 };
  if (n.includes('œuf') || n.includes('oeuf'))
    return { img: imgEgg,       w: 270, gap: 28,  brightness: 1.0  };

  return { img: imgSauce,       w: 250, gap: 16,  brightness: 1.0  };
};

// Calcul de la position Y centrale de chaque couche (empilement du haut vers le bas)
const computePositions = (layers) => {
  const cfgs = layers.map(getCfg);
  const total = cfgs.reduce((s, c) => s + c.gap, 0);
  let y = -total / 2;
  return cfgs.map(c => {
    const pos = y + c.gap / 2;
    y += c.gap;
    return pos;
  });
};

// ===================================================================
//  UNE COUCHE D'INGRÉDIENT
// ===================================================================
const IngredientLayer = ({ layer, index, assembledY, totalLayers, isExploded, isHovered, setHovered }) => {
  const { img, w, brightness } = getCfg(layer);

  const explodedY = (index - (totalLayers - 1) / 2) * 85;
  const targetY   = isExploded ? explodedY : assembledY;
  const zIndex    = totalLayers - index + 1;

  const shadowY     = isExploded ? 30 : 10;
  const shadowBlur  = isExploded ? 40 : 18;
  const shadowAlpha = isExploded ? 0.7 : 0.5;

  return (
    <motion.div
      initial={{ opacity: 0, y: -200, scale: 0.4 }}
      animate={{
        opacity: 1,
        y: targetY + (isHovered && !isExploded ? -10 : 0),
        scale: isHovered ? 1.04 : 1.0,
      }}
      exit={{ opacity: 0, scale: 0.2, y: -150 }}
      transition={{ type: 'spring', stiffness: 240, damping: 24 }}
      style={{
        position: 'absolute',
        zIndex,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
    >
      <img
        src={img}
        alt={layer.name}
        style={{
          width: `${w}px`,
          height: 'auto',
          objectFit: 'contain',
          pointerEvents: 'none',
          filter: `
            brightness(${isHovered ? Math.min(brightness + 0.15, 1.4) : brightness})
            drop-shadow(0px ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowAlpha}))
          `,
        }}
      />

      {/* Badge nom au survol */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.12 }}
            style={{
              position: 'absolute',
              right: '-90px',
              background: 'rgba(10,10,15,0.95)',
              border: '1px solid #F59E0B',
              borderRadius: '6px',
              padding: '3px 10px',
              fontSize: '10px',
              fontWeight: '800',
              color: '#F59E0B',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              zIndex: 300,
            }}
          >
            {layer.name}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ===================================================================
//  COMPOSANT PRINCIPAL
// ===================================================================
const RealBurgerViewer = ({
  layers = [],
  isExploded = false,
  setIsExploded,
  hoveredLayerIndex = null,
  setHoveredLayerIndex = () => {},
  onBurgerClick = () => {},
}) => {
  const positions = computePositions(layers);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative select-none"
      style={{ minHeight: '520px' }}
    >
      {/* Zone burger */}
      <div
        className="relative flex-1 flex items-center justify-center"
        style={{ width: '100%', minHeight: '460px', zIndex: 1 }}
      >
        {/* Ombre douce sous le burger */}
        <motion.div
          animate={{ scaleX: isExploded ? 0.45 : 1, opacity: isExploded ? 0.15 : 0.5 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          style={{
            position: 'absolute',
            bottom: '6%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '260px',
            height: '22px',
            background: 'radial-gradient(ellipse, rgba(245,158,11,0.15) 0%, transparent 70%)',
            filter: 'blur(14px)',
          }}
        />

        <AnimatePresence>
          {layers.map((layer, idx) => (
            <IngredientLayer
              key={layer.id || idx}
              layer={layer}
              index={idx}
              assembledY={positions[idx]}
              totalLayers={layers.length}
              isExploded={isExploded}
              isHovered={hoveredLayerIndex === idx}
              setHovered={setHoveredLayerIndex}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Bouton vue éclatée */}
      <div className="flex items-center gap-3 flex-shrink-0 pb-4" style={{ zIndex: 10 }}>
        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.93 }}
          onClick={(e) => { e.stopPropagation(); setIsExploded(!isExploded); }}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '9px 20px', borderRadius: '999px',
            fontSize: '11px', fontWeight: '800',
            letterSpacing: '0.1em', textTransform: 'uppercase',
            background: isExploded ? 'rgba(245,158,11,0.18)' : 'rgba(255,255,255,0.07)',
            border: `1px solid ${isExploded ? '#F59E0B' : 'rgba(255,255,255,0.14)'}`,
            color: isExploded ? '#F59E0B' : '#9CA3AF',
            boxShadow: '0 8px 25px rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            cursor: 'pointer',
          }}
        >
          {isExploded ? <Minimize2 size={14} strokeWidth={2.5} /> : <Layers3 size={14} strokeWidth={2.5} />}
          <span>{isExploded ? 'Assembler le burger' : 'Vue éclatée'}</span>
        </motion.button>
      </div>
    </div>
  );
};

export default RealBurgerViewer;