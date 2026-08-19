// src/pages/CustomBurger.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw, Heart, ShoppingBag, ChefHat, Sparkles,
  Layers3, Info, X, CheckCircle2, ArrowRight
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import RealBurgerViewer from '../components/RealBurgerViewer';

/* ========================================================
   CONFIGURATION DES CATÉGORIES
======================================================== */
const CATEGORIES = {
  PAIN:     { label: 'Pain',    emoji: '🍞', desc: 'Choisis ta base' },
  VIANDES:  { label: 'Viandes', emoji: '🥩', desc: 'Ton protéiné' },
  FROMAGES: { label: 'Fromage', emoji: '🧀', desc: 'Fondant & savoureux' },
  LÉGUMES:  { label: 'Légumes', emoji: '🥬', desc: 'Fraîcheur & croquant' },
  SAUCES:   { label: 'Sauces',  emoji: '🥫', desc: 'La touche secrète' },
  EXTRAS:   { label: 'Extras',  emoji: '⭐', desc: 'Pour aller plus loin' },
};

/* ========================================================
   DONNÉES INGRÉDIENTS
======================================================== */
const ingredientsData = {
  PAIN: [
    { id: 'bun-1', name: 'Pain brioché',  price: 2.50, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80', isBun: true },
    { id: 'bun-2', name: 'Pain sésame',   price: 2.50, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80', isBun: true },
    { id: 'bun-3', name: 'Pain complet',  price: 2.80, image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80', isBun: true },
    { id: 'bun-4', name: 'Pain noir',     price: 3.50, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80', isBun: true },
  ],
  VIANDES: [
    { id: 'meat-1', name: 'Steak haché',   price: 4.50, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80' },
    { id: 'meat-2', name: 'Double Steak',  price: 6.50, image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=600&q=80' },
    { id: 'meat-3', name: 'Poulet pané',   price: 5.00, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80' },
    { id: 'meat-4', name: 'Galette Veggie',price: 4.50, image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=600&q=80' },
  ],
  FROMAGES: [
    { id: 'cheese-1', name: 'Cheddar',        price: 1.50, image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80' },
    { id: 'cheese-2', name: 'Double Cheddar', price: 2.20, image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=600&q=80' },
    { id: 'cheese-3', name: 'Raclette',       price: 2.50, image: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?auto=format&fit=crop&w=600&q=80' },
    { id: 'cheese-4', name: 'Chèvre rôti',    price: 2.00, image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=600&q=80' },
  ],
  LÉGUMES: [
    { id: 'veg-1', name: 'Laitue',        price: 0.50, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=600&q=80' },
    { id: 'veg-2', name: 'Tomates',       price: 0.50, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80' },
    { id: 'veg-3', name: 'Oignons rouges',price: 0.50, image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80' },
    { id: 'veg-4', name: 'Cornichons',    price: 0.50, image: 'https://images.unsplash.com/photo-1589621316382-008457b855dd?auto=format&fit=crop&w=600&q=80' },
    { id: 'veg-5', name: 'Oignons frits', price: 0.80, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=600&q=80' },
    { id: 'veg-6', name: 'Jalapeños',     price: 0.80, image: 'https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?auto=format&fit=crop&w=600&q=80' },
  ],
  SAUCES: [
    { id: 'sauce-1', name: 'Mayo',        price: 0.50, image: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=600&q=80' },
    { id: 'sauce-2', name: 'Ketchup',     price: 0.50, image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=600&q=80' },
    { id: 'sauce-3', name: 'Sauce burger',price: 0.60, image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&q=80' },
    { id: 'sauce-4', name: 'BBQ',         price: 0.60, image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=600&q=80' },
  ],
  EXTRAS: [
    { id: 'extra-1', name: 'Bacon croustillant', price: 1.80, image: 'https://images.unsplash.com/photo-1528607929212-2636ec44253e?auto=format&fit=crop&w=600&q=80' },
    { id: 'extra-2', name: 'Avocat frais',       price: 1.50, image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80' },
    { id: 'extra-3', name: 'Œuf au plat',        price: 1.20, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80' },
    { id: 'extra-4', name: 'Hashbrown',          price: 1.50, image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80' },
  ],
};

const DEFAULT_LAYERS = [
  { id: 'bun-top',    name: 'Pain brioché',  price: 1.25, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80', isBun: true, isTopBun: true },
  { id: 'sauce-init', name: 'Sauce burger',  price: 0.60, image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&q=80' },
  { id: 'veg-init-1', name: 'Oignons rouges',price: 0.50, image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80' },
  { id: 'veg-init-2', name: 'Tomates',       price: 0.50, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80' },
  { id: 'veg-init-3', name: 'Laitue',        price: 0.50, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=600&q=80' },
  { id: 'cheese-init',name: 'Cheddar',       price: 1.50, image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80' },
  { id: 'meat-init',  name: 'Steak haché',   price: 4.50, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80' },
  { id: 'veg-init-4', name: 'Cornichons',    price: 0.50, image: 'https://images.unsplash.com/photo-1589621316382-008457b855dd?auto=format&fit=crop&w=600&q=80' },
  { id: 'bun-bottom', name: 'Pain brioché',  price: 1.25, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80', isBun: true, isBottomBun: true },
];

/* ========================================================
   COMPOSANT PRINCIPAL
======================================================== */
const CustomBurger = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart, setIsCartOpen } = useCart();
  const selectedDishFromMenu = location.state?.selectedDish;

  const [activeTab, setActiveTab]             = useState('PAIN');
  const [layers, setLayers]                   = useState(DEFAULT_LAYERS);
  const [hoveredLayerIndex, setHoveredLayerIndex] = useState(null);
  const [isExploded, setIsExploded]           = useState(false);
  const [showLayerPanel, setShowLayerPanel]   = useState(false);

  const refPAIN     = useRef(null);
  const refVIANDES  = useRef(null);
  const refFROMAGES = useRef(null);
  const refLÉGUMES  = useRef(null);
  const refSAUCES   = useRef(null);
  const refEXTRAS   = useRef(null);
  const sectionRefs = {
    PAIN:     refPAIN,
    VIANDES:  refVIANDES,
    FROMAGES: refFROMAGES,
    LÉGUMES:  refLÉGUMES,
    SAUCES:   refSAUCES,
    EXTRAS:   refEXTRAS,
  };

  useEffect(() => {
    if (selectedDishFromMenu) {
      toast.success(`Personnalisation : ${selectedDishFromMenu.name}`, {
        icon: '🍔',
        style: { background: 'var(--bg-toast)', color: 'var(--color-toast)' },
      });
    }
  }, [selectedDishFromMenu]);

  /* ------ Handlers ------ */
  const handleTabClick = (cat) => {
    setActiveTab(cat);
    sectionRefs[cat]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleReset = () => {
    setLayers(DEFAULT_LAYERS);
    toast('Recette réinitialisée !', { icon: '↻', style: { background: 'var(--bg-toast)', color: 'var(--color-toast)' } });
  };

  const handleAddIngredient = (item) => {
    if (item.isBun) {
      setLayers((prev) =>
        prev.map((layer) => {
          if (layer.isBun || layer.id === 'bun-top' || layer.id === 'bun-bottom') {
            return {
              ...item,
              id: `${item.id}-${Date.now()}-${layer.isTopBun ? 'top' : 'bot'}`,
              price: item.price / 2,
              isBun: true,
              isTopBun: layer.isTopBun || layer.id === 'bun-top',
              isBottomBun: layer.isBottomBun || layer.id === 'bun-bottom',
            };
          }
          return layer;
        })
      );
      toast.success(`Pain changé : ${item.name}`, { style: { background: 'var(--bg-toast)', color: 'var(--color-toast)' } });
    } else {
      const newLayer = { ...item, id: `${item.id}-${Date.now()}` };
      setLayers((prev) => {
        const copy = [...prev];
        copy.splice(1, 0, newLayer);
        return copy;
      });
      toast.success(`+ ${item.name}`, { icon: '🍔', duration: 1200, style: { background: 'var(--bg-toast)', color: 'var(--color-toast)' } });
    }
  };

  const handleRemoveLayer = (idx) => {
    const l = layers[idx];
    if (l?.isBun || l?.isTopBun || l?.isBottomBun || l?.id === 'bun-top' || l?.id === 'bun-bottom') {
      toast.error('🍞 Le pain est intouchable !', {
        style: { background: 'var(--bg-toast)', color: '#F59E0B', border: '1px solid #F59E0B' },
      });
      return;
    }
    setLayers((prev) => prev.filter((_, i) => i !== idx));
  };

  const totalPrice = layers.reduce((s, l) => s + (l.price || 0), 0) + 2.50;
  const ingredientCount = layers.filter((l) => !l.isBun && !l.isTopBun && !l.isBottomBun).length;

  const handleAddToCart = () => {
    const customDish = {
      _id: `custom-${Date.now()}`,
      name: selectedDishFromMenu ? `${selectedDishFromMenu.name} (Perso)` : 'Burger Gourmet Sur Mesure',
      price: totalPrice,
      image: selectedDishFromMenu?.image || 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
      category: 'Signatures',
    };
    addToCart(customDish, 1, layers.map((l) => l.name), { layers });
    setIsCartOpen(true);
  };

  /* ------ UI ------ */
  return (
    <div className="min-h-screen bg-[#0B0B0E] text-white pt-24 pb-16 overflow-x-hidden font-body relative">

      {/* Ambient glows */}
      <div className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-[#F59E0B]/5 rounded-full blur-[180px] pointer-events-none -z-0" />
      <div className="fixed top-1/2 right-1/4  w-[400px] h-[400px] bg-amber-900/8 rounded-full blur-[150px] pointer-events-none -z-0" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* ============================================================
            PAGE HEADER
        ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-gold inline-flex items-center gap-1.5">
                <Sparkles size={11} /> STUDIO BURGER 3D
              </span>
            </div>
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight leading-none">
              <span className="text-white">CRÉE TON </span>
              <span className="text-[#F59E0B]">BURGER</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {selectedDishFromMenu
                ? `Personnalisation de : ${selectedDishFromMenu.name}`
                : 'Choisis tes ingrédients, visualise en temps réel & commande.'}
            </p>
          </div>

          {/* Stats rapides */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="glass-card-premium px-4 py-3 rounded-2xl text-center min-w-[80px]">
              <p className="font-heading font-black text-xl text-[#F59E0B]">{layers.length}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Couches</p>
            </div>
            <div className="glass-card-premium px-4 py-3 rounded-2xl text-center min-w-[80px]">
              <p className="font-heading font-black text-xl text-[#F59E0B]">{ingredientCount}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Ingrédients</p>
            </div>
            <div className="glass-card-premium px-4 py-3 rounded-2xl text-center min-w-[100px]">
              <p className="font-heading font-black text-xl text-[#F59E0B]">{totalPrice.toFixed(2)}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">DT Total</p>
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            GRILLE PRINCIPALE — 3 colonnes sur desktop
        ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">

          {/* ─────────────────────────────────────────────────────────
              COL GAUCHE : SÉLECTEUR D'INGRÉDIENTS (4 colonnes)
          ───────────────────────────────────────────────────────── */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 bg-[#131318] border border-white/8 rounded-[24px] shadow-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: 'calc(100vh - 130px)' }}
          >
            {/* Header du panneau gauche */}
            <div className="px-5 pt-5 pb-4 border-b border-white/8 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
                  <ChefHat size={17} />
                </div>
                <div>
                  <h2 className="font-heading font-black text-sm text-white uppercase tracking-wider">Tes ingrédients</h2>
                  <p className="text-[10px] text-gray-500">Clique pour ajouter</p>
                </div>
              </div>

              {/* Tabs catégories scrollables */}
              <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
                {Object.entries(CATEGORIES).map(([key, cat]) => (
                  <button
                    key={key}
                    onClick={() => handleTabClick(key)}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-heading font-bold uppercase tracking-wide transition-all border ${
                      activeTab === key
                        ? 'bg-[#F59E0B] text-black border-[#F59E0B] shadow-lg shadow-[#F59E0B]/20'
                        : 'bg-[#181820] text-gray-400 border-white/8 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Liste des ingrédients par catégorie */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-6">
              {Object.entries(ingredientsData).map(([cat, items]) => {
                const catInfo = CATEGORIES[cat];
                return (
                  <div key={cat} ref={sectionRefs[cat]}>
                    {/* En-tête de section */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base">{catInfo.emoji}</span>
                      <div>
                        <h3 className="font-heading font-black text-xs text-white uppercase tracking-wider">{catInfo.label}</h3>
                        <p className="text-[10px] text-gray-500">{catInfo.desc}</p>
                      </div>
                    </div>

                    {/* Grille 2 colonnes */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {items.map((item) => {
                        const isBunSelected = item.isBun && layers[0]?.name === item.name;
                        return (
                          <motion.button
                            key={item.id}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => handleAddIngredient(item)}
                            className={`relative p-3 rounded-2xl border text-left transition-all group flex flex-col items-center gap-2 ${
                              isBunSelected
                                ? 'border-[#F59E0B] bg-[#F59E0B]/8 shadow-md shadow-[#F59E0B]/15'
                                : 'border-white/6 bg-[#181820] hover:border-[#F59E0B]/50 hover:bg-[#1e1a10]/40'
                            }`}
                          >
                            {/* Badge sélectionné / + */}
                            <div className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                              isBunSelected
                                ? 'bg-[#F59E0B] text-black'
                                : 'bg-white/6 border border-white/10 text-gray-500 group-hover:bg-[#F59E0B]/20 group-hover:text-[#F59E0B] group-hover:border-[#F59E0B]/30'
                            }`}>
                              {isBunSelected ? '✓' : '+'}
                            </div>

                            {/* Image */}
                            <div className="w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-contain drop-shadow-md"
                              />
                            </div>

                            {/* Nom & prix */}
                            <div className="text-center w-full">
                              <p className={`font-medium text-[11px] truncate transition-colors ${isBunSelected ? 'text-[#F59E0B]' : 'text-gray-300 group-hover:text-white'}`}>
                                {item.name}
                              </p>
                              <p className="text-[10px] text-[#F59E0B]/70 font-bold">+{item.price.toFixed(2)} DT</p>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.aside>

          {/* ─────────────────────────────────────────────────────────
              COL CENTRE : VISUALISATION BURGER 3D (5 colonnes)
          ───────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 bg-[#131318] border border-white/8 rounded-[24px] shadow-2xl flex flex-col overflow-hidden"
            style={{ minHeight: '680px' }}
          >
            {/* Header */}
            <div className="px-6 pt-5 pb-4 border-b border-white/8 shrink-0 flex items-center justify-between">
              <div className="space-y-0.5">
                <h2 className="font-heading font-black text-base text-white uppercase tracking-wider">Mon Burger</h2>
                <div className="w-8 h-0.5 bg-[#F59E0B] rounded-full" />
              </div>
              <div className="flex items-center gap-2">
                {/* Bouton vue couches mobile */}
                <button
                  onClick={() => setShowLayerPanel(!showLayerPanel)}
                  className="lg:hidden px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-gray-300 flex items-center gap-1.5 transition-all hover:border-[#F59E0B]/40"
                >
                  <Layers3 size={13} />
                  <span>{layers.length} couches</span>
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/4 text-gray-400 hover:text-white text-[11px] font-bold uppercase tracking-wide flex items-center gap-1.5 transition-all hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400"
                >
                  <RotateCcw size={12} />
                  <span>Reset</span>
                </motion.button>
              </div>
            </div>

            {/* Burger 3D viewer */}
            <div className="flex-1 flex items-center justify-center relative p-4">
              {/* Lueur ambiante */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#F59E0B]/4 via-transparent to-transparent pointer-events-none" />
              <RealBurgerViewer
                layers={layers}
                onRemoveLayer={handleRemoveLayer}
                hoveredLayerIndex={hoveredLayerIndex}
                setHoveredLayerIndex={setHoveredLayerIndex}
                isExploded={isExploded}
                setIsExploded={setIsExploded}
                onBurgerClick={() => setIsExploded(!isExploded)}
                isInteractiveBuilder={true}
              />
            </div>

            {/* Tip survol */}
            <div className="px-6 pb-4 shrink-0">
              <div className="flex items-center gap-2 text-[10px] text-gray-500 bg-white/3 border border-white/6 rounded-xl px-3 py-2">
                <Info size={12} className="text-[#F59E0B]/60 shrink-0" />
                <span>Survole chaque couche pour identifier l'ingrédient • Clique sur <strong className="text-[#F59E0B]/80">Vue éclatée</strong> pour tout voir</span>
              </div>
            </div>
          </motion.div>

          {/* ─────────────────────────────────────────────────────────
              COL DROITE : RÉCAPITULATIF & PANIER (3 colonnes)
          ───────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 flex flex-col gap-4"
          >
            {/* --- Récapitulatif couches --- */}
            <div className="bg-[#131318] border border-white/8 rounded-[24px] shadow-2xl overflow-hidden flex flex-col"
              style={{ maxHeight: '480px' }}
            >
              <div className="px-5 pt-4 pb-3 border-b border-white/8 shrink-0 flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-black text-sm text-white uppercase tracking-wide">Recette</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">{layers.length} couches au total</p>
                </div>
                <span className="text-[10px] bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/25 px-2 py-0.5 rounded-full font-bold">
                  {ingredientCount} ingréd.
                </span>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar px-3 py-3 space-y-1">
                <AnimatePresence>
                  {layers.map((layer, idx) => {
                    const isBunLayer = layer.isBun || layer.isTopBun || layer.isBottomBun;
                    const isHov = hoveredLayerIndex === idx;
                    return (
                      <motion.div
                        layout
                        key={layer.id || idx}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.85, x: 10 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={() => setHoveredLayerIndex(idx)}
                        onMouseLeave={() => setHoveredLayerIndex(null)}
                        className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-all border group ${
                          isHov
                            ? 'bg-[#F59E0B]/6 border-[#F59E0B]/20'
                            : 'border-transparent hover:bg-white/3'
                        }`}
                      >
                        {/* Indicateur bun */}
                        {isBunLayer ? (
                          <div className="w-1 h-6 rounded-full bg-[#F59E0B]/50 shrink-0" />
                        ) : (
                          <div className="w-1 h-6 rounded-full bg-white/10 group-hover:bg-white/20 shrink-0" />
                        )}

                        {/* Photo ronde */}
                        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0 bg-[#181820]">
                          <img src={layer.image} alt={layer.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Nom */}
                        <span className={`flex-1 text-xs font-medium truncate transition-colors ${
                          isHov ? 'text-[#F59E0B]' : 'text-gray-300'
                        }`}>
                          {layer.name}
                        </span>

                        {/* Prix */}
                        <span className="text-[10px] text-gray-500 font-bold shrink-0">
                          {layer.price?.toFixed(2)} DT
                        </span>

                        {/* Supprimer */}
                        {!isBunLayer && (
                          <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemoveLayer(idx)}
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black border border-white/10 text-gray-500 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400 transition-all shrink-0"
                          >
                            ×
                          </motion.button>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* --- Bandeau prix & commande --- */}
            <div className="bg-[#131318] border border-[#F59E0B]/20 rounded-[24px] shadow-2xl shadow-[#F59E0B]/5 p-5 space-y-4">

              {/* Détail prix */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Ingrédients</span>
                  <span className="text-white font-bold">{(totalPrice - 2.50).toFixed(2)} DT</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">Préparation</span>
                  <span className="text-white font-bold">2.50 DT</span>
                </div>
                <div className="h-px bg-white/8" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white uppercase tracking-wide">Total</span>
                  <span className="text-2xl font-heading font-black text-[#F59E0B]">
                    {totalPrice.toFixed(2)} <span className="text-base">DT</span>
                  </span>
                </div>
              </div>

              {/* Bouton Sauvegarder */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => toast.success('Recette sauvegardée ! ♡', { style: { background: 'var(--bg-toast)', color: 'var(--color-toast)' } })}
                className="w-full flex items-center justify-center gap-2 border border-white/12 bg-white/4 hover:bg-white/8 hover:border-white/25 text-gray-300 hover:text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all"
              >
                <Heart size={14} />
                <span>Sauvegarder la recette</span>
              </motion.button>

              {/* Bouton Ajouter au panier */}
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: '#FBBF24' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  if (isExploded) setIsExploded(false);
                  handleAddToCart();
                }}
                className="w-full flex items-center justify-center gap-2.5 bg-[#F59E0B] text-black font-heading font-black text-sm uppercase tracking-wider py-4 rounded-xl shadow-xl shadow-[#F59E0B]/25 transition-all"
              >
                <ShoppingBag size={18} className="stroke-[2.5]" />
                <span>AJOUTER AU PANIER</span>
                <ArrowRight size={16} className="stroke-[2.5]" />
              </motion.button>

              {/* Info livraison */}
              <div className="flex items-center gap-2 text-[10px] text-gray-500 text-center justify-center">
                <CheckCircle2 size={11} className="text-[#F59E0B]/60" />
                <span>Préparation fraîche · Livraison 30 min</span>
              </div>
            </div>

            {/* --- Lien retour menu --- */}
            <button
              onClick={() => navigate('/menu')}
              className="text-[11px] text-gray-500 hover:text-[#F59E0B] transition-colors flex items-center justify-center gap-1.5 py-1"
            >
              ← Retour au menu complet
            </button>
          </motion.div>

        </div>{/* fin grid */}
      </div>
    </div>
  );
};

export default CustomBurger;