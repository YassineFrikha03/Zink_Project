// src/components/CartDrawer.jsx
import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, setIsCheckoutOpen, removeFromCart, updateQuantity, totalAmount, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Arrière-plan sombre avec flou */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Tiroir coulissant */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#121217] border-l border-white/10 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#181820]">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[#F59E0B]/20 text-[#F59E0B]">
                    <ShoppingBag size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-lg text-white">MON PANIER</h3>
                    <p className="text-xs text-gray-400">{totalItems} article(s) sélectionné(s)</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Liste des articles */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <motion.div 
                      animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-20 h-20 rounded-full bg-[#181820] flex items-center justify-center text-4xl mb-4 border border-white/5 shadow-inner"
                    >
                      🍔
                    </motion.div>
                    <h4 className="font-heading font-bold text-lg text-white mb-1">Ton panier est vide !</h4>
                    <p className="text-sm text-gray-400 max-w-xs mb-6">
                      Découvre nos burgers signatures faits maison et nos accompagnements croustillants.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="btn-gold text-xs uppercase px-6 py-3"
                    >
                      Découvrir le menu
                    </button>
                  </div>
                ) : (
                  <AnimatePresence>
                    {cart.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, x: 50 }}
                        key={item.key}
                        className="bg-[#181820] border border-white/5 rounded-xl p-3.5 flex gap-4 items-center relative group hover:border-white/10 transition-all shadow-md"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover bg-black/40 shrink-0 border border-white/5"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h5 className="font-heading font-bold text-sm text-white truncate">{item.name}</h5>
                            <span className="font-heading font-black text-sm text-[#F59E0B] shrink-0">
                              {(item.price * item.quantity).toFixed(2).replace('.', ',')} DT
                            </span>
                          </div>

                          {/* Options ou personnalisation */}
                          {item.selectedOptions && item.selectedOptions.length > 0 && (
                            <p className="text-[11px] text-gray-400 truncate mt-0.5">
                              {item.selectedOptions.join(' • ')}
                            </p>
                          )}
                          {item.customDetails && (
                            <span className="inline-block bg-amber-500/20 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded mt-1 border border-amber-500/30">
                              ★ Sur mesure
                            </span>
                          )}

                          {/* Contrôles quantité & suppression */}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2 bg-[#121217] border border-white/5 rounded-lg px-2 py-1">
                              <button
                                onClick={() => updateQuantity(item.key, -1)}
                                className="text-gray-400 hover:text-white transition-colors p-0.5"
                                aria-label="Diminuer la quantité"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="font-heading font-bold text-xs text-white px-1">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.key, 1)}
                                className="text-gray-400 hover:text-white transition-colors p-0.5"
                                aria-label="Augmenter la quantité"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.1, color: '#F87171' }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeFromCart(item.key)}
                              className="text-gray-500 hover:text-red-400 p-1 transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer et Total */}
              {cart.length > 0 && (
                <div className="p-6 bg-[#181820] border-t border-white/10 space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Sous-total</span>
                      <span>{totalAmount.toFixed(2).replace('.', ',')} DT</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Livraison rapide</span>
                      <span className="text-[#F59E0B] font-semibold">5,00 DT</span>
                    </div>
                    <div className="border-t border-white/10 pt-2 flex justify-between items-center text-base">
                      <span className="font-heading font-bold text-white">TOTAL</span>
                      <span className="font-heading font-black text-xl text-[#F59E0B]">
                        {(totalAmount + 5.00).toFixed(2).replace('.', ',')} DT
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="btn-gold w-full py-3.5 text-sm uppercase tracking-wider font-black shadow-lg shadow-[#F59E0B]/30 flex items-center justify-center gap-2"
                  >
                    VALIDER MA COMMANDE <ArrowRight size={18} />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
