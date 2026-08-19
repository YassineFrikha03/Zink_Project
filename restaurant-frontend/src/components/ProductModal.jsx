import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Sparkles, Clock, Info } from 'lucide-react';

const ProductModal = ({ isOpen, onClose, dish, onAddToCart, onCustomize }) => {
  if (!dish) return null;

  const isBurger = dish.category !== 'Accompagnements' && dish.category !== 'Boissons';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#121217] w-full max-w-3xl rounded-[32px] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(245,158,11,0.15)] flex flex-col md:flex-row pointer-events-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#F59E0B] hover:bg-black/80 transition-all backdrop-blur-md"
              >
                <X size={20} />
              </button>

              {/* Image Section (Left on desktop, Top on mobile) */}
              <div className="md:w-1/2 relative bg-black min-h-[300px] md:min-h-full flex items-center justify-center overflow-hidden">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#121217]" />
                
                {dish.isSignature && (
                  <div className="absolute top-5 left-5">
                    <span className="badge-gold shadow-xl">★ Signature</span>
                  </div>
                )}
              </div>

              {/* Content Section (Right on desktop, Bottom on mobile) */}
              <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-between">
                <div className="space-y-5">
                  {/* Title & Price */}
                  <div className="space-y-1">
                    <h2 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase leading-tight pr-8">
                      {dish.name}
                    </h2>
                    <div className="text-3xl font-black font-heading text-[#F59E0B] pt-1">
                      {Number(dish.price).toFixed(2).replace('.', ',')} DT
                    </div>
                  </div>

                  {/* Badges/Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {dish.tags && dish.tags.map((tag, idx) => (
                      <span key={idx} className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                    {(dish.prepTime || dish.preparationTime) && (
                      <span className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Clock size={12} /> {dish.prepTime || `${dish.preparationTime} min`}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <div className="text-gray-400 text-sm leading-relaxed pt-2">
                    {dish.description || "Une création délicieuse préparée avec passion."}
                  </div>

                  {/* Allergens or Info (mock logic) */}
                  <div className="flex items-start gap-3 text-xs text-gray-400 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                    <Info size={16} className="shrink-0 mt-0.5 text-gray-500" />
                    <p>Ce produit est préparé à la commande avec des ingrédients frais. {isBurger && "Vous pouvez modifier sa recette en cliquant sur Personnaliser."}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 space-y-3">
                  <button
                    onClick={() => {
                      onAddToCart(dish);
                      onClose();
                    }}
                    className="w-full bg-[#181820] border border-white/10 hover:border-white/30 text-white font-bold text-sm uppercase tracking-widest py-4 rounded-2xl transition-all flex items-center justify-center gap-2.5 shadow-sm"
                  >
                    <ShoppingBag size={18} />
                    <span>COMMANDER STANDARD</span>
                  </button>

                  {isBurger && (
                    <button
                      onClick={() => {
                        onCustomize(dish);
                        onClose();
                      }}
                      className="w-full bg-gradient-to-r from-[#F59E0B] to-amber-500 hover:from-amber-400 hover:to-amber-500 text-black font-black text-sm uppercase tracking-widest py-4 rounded-2xl shadow-xl shadow-[#F59E0B]/20 transition-all flex items-center justify-center gap-2.5"
                    >
                      <Sparkles size={18} className="animate-pulse" />
                      <span>PERSONNALISER EN 3D</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
