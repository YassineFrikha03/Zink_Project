// src/pages/Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Star, GraduationCap, Gift, Smartphone, 
  ShoppingBag, Sparkles, Clock, CheckCircle2, Award, 
  Flame, ChefHat, ShieldCheck, Heart, Users 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import ExplodedBurger3D from '../components/ExplodedBurger3D';
import HeroPhotoBurger from '../components/HeroPhotoBurger';
import { useCart } from '../context/CartContext';

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [hoveredLayerIndex, setHoveredLayerIndex] = useState(null);
  const [activeSignatureTab, setActiveSignatureTab] = useState('TOUS');
  const [emailInput, setEmailInput] = useState('');

  // Couches par défaut pour le burger star de l'accueil
  const heroLayers = [
    { id: 'bun-top', name: 'Pain brioché au sésame toasté', price: 1.25, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80', isTopBun: true },
    { id: 'sauce-init', name: 'Sauce Burger Gourmet Maison', price: 0.60, image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=600&q=80' },
    { id: 'veg-init-1', name: 'Oignons rouges croquants', price: 0.50, image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80' },
    { id: 'veg-init-2', name: 'Tomates fraîches du verger', price: 0.50, image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80' },
    { id: 'veg-init-3', name: 'Laitue iceberg croquante', price: 0.50, image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=600&q=80' },
    { id: 'cheese-init', name: 'Cheddar affiné 12 mois fondant', price: 1.50, image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80' },
    { id: 'meat-init', name: 'Steak haché pur bœuf Angus grillé', price: 4.50, image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80' },
    { id: 'veg-init-4', name: 'Cornichons pickles artisanaux', price: 0.50, image: 'https://images.unsplash.com/photo-1589621316382-008457b855dd?auto=format&fit=crop&w=600&q=80' },
    { id: 'bun-bottom', name: 'Pain brioché toasté au beurre aromatisé', price: 1.25, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80', isBottomBun: true },
  ];

  // Burgers Signatures affichés sur la page d'accueil avec ajout direct au panier
  const signatureDishes = [
    {
      _id: 'sig-1',
      name: 'Le Tornado Burger (Signature Zink)',
      price: 41.90,
      description: 'Double steak haché pur bœuf Angus maturé au grill, oignons caramélisés maison, double cheddar coulant et sauce secrète Zink sur pain brioché sésame artisanal.',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      category: 'Signatures',
      subCategory: 'SIGNATURES',
      badge: '🔥 Signature L\'Original',
      prepTime: '14 min',
      calories: '860 kcal',
      tags: ['#Bœuf Maturé', '#Cheddar AOP', '#Sauce Zink']
    },
    {
      _id: 'sig-2',
      name: 'Le Deluxe Burger Angus Supreme',
      price: 35.90,
      description: 'Steak Angus grillé, tranches de poitrine de lard fumé (bacon croustillant), cheddar affiné, poêlée de champignons de bois au beurre et herbes fraîches.',
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
      category: 'Signatures',
      subCategory: 'SMASH BURGERS',
      badge: '⭐ Recommandé par le Chef',
      prepTime: '13 min',
      calories: '820 kcal',
      tags: ['#Bacon Croustillant', '#Champignons', '#Angus']
    },
    {
      _id: 'sig-3',
      name: 'La Truffe Noire Gourmet Burger',
      price: 33.90,
      description: 'Pur bœuf Angus saisi, émulsion crémeuse à la truffe noire d\'été, fromage suisse affiné et roquette fraîche sur pain brioché doré au four.',
      image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
      category: 'Signatures',
      subCategory: 'SIGNATURES',
      badge: '✨ Élégance Absolue',
      prepTime: '12 min',
      calories: '750 kcal',
      tags: ['#Truffe Noire', '#Fromage Suisse', '#Angus']
    },
    {
      _id: 'sig-4',
      name: 'La Poutine Québécoise Zink',
      price: 24.90,
      description: 'Plat iconique du Zink : frites artisanales croustillantes taillées au couteau, véritable fromage en grains (squeaky cheese) et généreuse sauce brune gravy chaude maison.',
      image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80',
      category: 'Accompagnements',
      subCategory: 'VÉGÉTARIENS',
      badge: '🍟 L\'Iconique Zink',
      prepTime: '11 min',
      calories: '680 kcal',
      tags: ['#Fromage en Grains', '#Sauce Gravy', '#Frites Maison']
    }
  ];

  const filteredSignatures = signatureDishes.filter(dish => {
    if (activeSignatureTab === 'TOUS') return true;
    if (activeSignatureTab === 'SIGNATURES') return dish.subCategory === 'SIGNATURES';
    if (activeSignatureTab === 'SMASH BURGERS') return dish.subCategory === 'SMASH BURGERS';
    if (activeSignatureTab === 'VÉGÉTARIENS') return dish.subCategory === 'VÉGÉTARIENS';
    return true;
  });

  const handleQuickAddToCart = (dish) => {
    addToCart(dish, 1, []);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      toast.error('Veuillez entrer une adresse e-mail valide.');
      return;
    }
    toast.success('Félicitations ! Vous avez rejoint le Club Gourmet VIP. Votre burger offert vous attend !', {
      icon: '🎁',
      duration: 4000
    });
    setEmailInput('');
  };

  // Univers de la maquette Bento Grid (Section 3)
  const univers = [
    {
      title: 'NOS BURGERS SIGNATURES & CUSTOM',
      subtitle: 'Découvrez plus de 12 créations originales du Chef ou créez la vôtre en 3D avec notre Sommelier IA.',
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
      path: '/menu',
      badge: '12+ Recettes Gourmet',
      isHero: true
    },
    {
      title: 'NOS SALADES CROQUANTES',
      subtitle: 'Fraîches, gourmandes et assaisonnées à la commande avec nos vinaigrettes maison.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
      path: '/menu',
      badge: 'Fraîcheur du Jour'
    },
    {
      title: 'ACCOMPAGNEMENTS CRÉATIFS',
      subtitle: 'Frites de patate douce, onion rings artisanaux et bouchées fondantes au cheddar.',
      image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=600&q=80',
      path: '/menu',
      badge: 'Cuit à la Commande'
    },
    {
      title: 'BOISSONS ARTISANALES & DESSERTS',
      subtitle: 'Limonades bio maison, milkshakes onctueux à la vanille bourbon et cookies mi-cuits fondants.',
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
      path: '/menu',
      badge: 'Douceurs Suprêmes'
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-white pt-24 pb-20 overflow-hidden font-body relative">
      
      {/* Texture de fond générale */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      {/* =========================================================
          SECTION 1 : HERO SECTION ULTRA-LUXE & INTERACTIF
      ========================================================= */}
      <section className="container-custom py-8 sm:py-14 lg:py-20 relative z-10">
        
        {/* Lueurs d'ambiance 3D animées en arrière-plan */}
        <motion.div 
          animate={{ scale: [1, 1.18, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-[#F59E0B]/35 via-amber-600/20 to-transparent rounded-full blur-[150px] pointer-events-none" 
        />
        <motion.div 
          animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/25 to-purple-900/15 rounded-full blur-[140px] pointer-events-none" 
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          
          {/* Colonne Gauche : Titre, Boutons et Atouts en ligne (7 colonnes) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            {/* Badge d'excellence supérieure */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#181820]/90 border border-[#F59E0B]/40 shadow-lg shadow-[#F59E0B]/10 backdrop-blur-md"
            >
              <Sparkles size={15} className="text-[#F59E0B] animate-spin" />
              <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-amber-200">
                L'EXPÉRIENCE BURGER GOURMET & 3D N°1
              </span>
            </motion.div>

            {/* Grand Titre Maquette : LE GOÛT QUI TE RASSEMBLE */}
            <div className="space-y-1 relative inline-block lg:block">
              {/* Étincelles dorées au dessus du mot GOÛT */}
              <div className="absolute -top-7 left-[160px] sm:left-[210px] lg:left-[240px] text-[#F59E0B] animate-pulse pointer-events-none">
                <svg width="52" height="30" viewBox="0 0 52 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 26L4 8" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M26 22L26 2" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M40 26L48 8" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
              </div>

              <h1 className="text-5xl sm:text-6xl xl:text-[78px] font-heading font-black tracking-tight uppercase leading-[0.96]">
                <span className="text-white block">LE GOÛT</span>
                <span className="text-gradient-gold block drop-shadow-lg">QUI TE RASSEMBLE</span>
              </h1>
            </div>

            {/* Sous-titre */}
            <p className="text-gray-300 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 font-normal leading-relaxed">
              Des burgers 100% frais, préparés sous tes yeux avec amour, artisanat et intelligence culinaire.
            </p>

            {/* Boutons CTA alignés horizontalement */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/menu')}
                className="btn-gold keep-dark w-full sm:w-auto px-8 py-4 text-sm font-black tracking-wider uppercase shadow-xl flex items-center justify-center gap-3"
              >
                <ShoppingBag size={18} className="stroke-[2.5]" />
                <span>VOIR LE MENU GOURMET</span>
                <ArrowRight size={18} className="stroke-[3]" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, borderColor: '#F59E0B' }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/creer-mon-burger')}
                className="keep-dark w-full sm:w-auto bg-[#181820]/90 text-white font-bold text-sm uppercase px-8 py-4 rounded-full border border-white/20 hover:border-[#F59E0B] flex items-center justify-center gap-3 transition-all shadow-lg backdrop-blur-md"
              >
                <Sparkles size={18} className="text-[#F59E0B]" />
                <span>CRÉER MON BURGER 3D</span>
              </motion.button>
            </div>

            {/* 3 Atouts en cartes Glassmorphic haute qualité */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-xl mx-auto lg:mx-0">
              
              {/* Atout 1 : Ingrédients frais */}
              <motion.div 
                whileHover={{ y: -4, borderColor: 'rgba(245, 158, 11, 0.5)' }}
                className="glass-card-premium p-4 rounded-2xl flex items-center gap-3.5"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] shrink-0 shadow-inner">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-white uppercase tracking-wider">INGRÉDIENTS FRAIS</h4>
                  <p className="text-[11px] text-gray-400">Livrés chaque jour</p>
                </div>
              </motion.div>

              {/* Atout 2 : Fait Maison */}
              <motion.div 
                whileHover={{ y: -4, borderColor: 'rgba(245, 158, 11, 0.5)' }}
                className="glass-card-premium p-4 rounded-2xl flex items-center gap-3.5"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] shrink-0 shadow-inner">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                    <path d="M3 6h18"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-white uppercase tracking-wider">FAIT MAISON</h4>
                  <p className="text-[11px] text-gray-400">Recettes originales</p>
                </div>
              </motion.div>

              {/* Atout 3 : Livraison rapide */}
              <motion.div 
                whileHover={{ y: -4, borderColor: 'rgba(245, 158, 11, 0.5)' }}
                className="glass-card-premium p-4 rounded-2xl flex items-center gap-3.5"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] shrink-0 shadow-inner">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <circle cx="18.5" cy="17.5" r="3.5"/>
                    <circle cx="5.5" cy="17.5" r="3.5"/>
                    <circle cx="15" cy="5" r="1"/>
                    <path d="M12 17.5V14l-3-3 4-3 2 3h2"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-white uppercase tracking-wider">LIVRAISON RAPIDE</h4>
                  <p className="text-[11px] text-gray-400">En 30 min chez toi</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

          {/* Colonne Droite : Le Grand Burger 3D, Badge de commande & Avis */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-md sm:max-w-lg">
              
              {/* Lueur derrière le burger */}
              <div className="absolute inset-0 bg-[#F59E0B]/25 rounded-full blur-3xl -z-10 animate-pulse" />

              {/* Notre Photo HD du Burger Gourmet */}
              <div className="w-full relative z-10 pt-4">
                <HeroPhotoBurger />
              </div>

              {/* Sceau Doré "FAIT MAISON AVEC PASSION" en haut à droite */}
              <motion.div 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -right-2 sm:-top-8 sm:-right-6 z-20 bg-[#0B0B0E]/95 backdrop-blur-md border-2 border-[#F59E0B] rounded-full w-28 h-28 sm:w-36 sm:h-36 flex flex-col items-center justify-center p-2 shadow-2xl shadow-[#F59E0B]/20"
              >
                <div className="w-full h-full rounded-full border border-dashed border-[#F59E0B]/70 flex flex-col items-center justify-center text-center p-1">
                  <span className="font-heading font-black text-[9px] sm:text-[11px] text-[#F59E0B] uppercase tracking-widest leading-none">
                    • FAIT MAISON •
                  </span>
                  <div className="my-1.5 text-[#F59E0B]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 sm:w-7 sm:h-7 mx-auto">
                      <path d="M4 11h16a8 8 0 0 0-16 0z" />
                      <path d="M4 15h16" />
                      <path d="M4 19h16a3 3 0 0 0-16 0z" />
                      <path d="M6 11V9" />
                      <path d="M10 11V8" />
                      <path d="M14 11V9" />
                      <path d="M18 11V8" />
                    </svg>
                  </div>
                  <span className="font-heading font-bold text-[8px] sm:text-[10px] text-white uppercase tracking-wider leading-none">
                    AVEC PASSION
                  </span>
                </div>
              </motion.div>

              {/* Encadré Avis Clients Flottant en bas à droite */}
              <motion.div 
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 right-0 sm:-bottom-6 sm:right-4 z-20 bg-[#181820]/95 backdrop-blur-md border border-white/15 px-5 py-4 rounded-2xl shadow-2xl flex flex-col gap-2 min-w-[210px]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex -space-x-2.5 overflow-hidden">
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#181820] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="client" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#181820] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="client" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#181820] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="client" />
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#181820] object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="client" />
                  </div>
                  <span className="bg-[#F59E0B] text-black font-black text-xs px-2.5 py-0.5 rounded-md shadow-sm">
                    +15K
                  </span>
                </div>

                <span className="text-xs font-bold text-gray-300">
                  clients satisfaits
                </span>

                <div className="flex items-center gap-1.5 pt-0.5">
                  <div className="flex text-[#F59E0B]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={15} fill="#F59E0B" className="text-[#F59E0B]" />
                    ))}
                  </div>
                  <span className="font-heading font-black text-sm text-white">4,9/5</span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* =========================================================
          SECTION 2 : SHOWCASE INTERACTIF "NOS SIGNATURES GOURMET"
      ========================================================= */}
      <section className="container-custom py-16 sm:py-24 relative z-10 border-t border-white/5">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-4"
        >
          <span className="badge-gold inline-flex items-center gap-1.5">
            <Flame size={13} /> ★ SÉLECTION DU CHEF & IA
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black uppercase tracking-tight text-white">
            NOS BURGERS <span className="text-[#F59E0B]">SIGNATURES</span>
          </h2>
          <div className="w-16 h-1 bg-[#F59E0B] rounded-full mx-auto" />
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Des recettes exclusives préparées à la commande, avec des viandes d'exception et des sauces maison. Commandez directement en un clic !
          </p>
        </motion.div>

        {/* Pilules de filtrage */}
        <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {['TOUS', 'SIGNATURES', 'SMASH BURGERS', 'VÉGÉTARIENS'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSignatureTab(tab)}
              className={`tab-pill px-6 py-2.5 rounded-full text-xs font-heading font-bold uppercase transition-all ${
                activeSignatureTab === tab
                  ? 'active bg-[#F59E0B] text-black border-[#F59E0B] shadow-lg shadow-[#F59E0B]/30'
                  : 'bg-[#181820] text-gray-300 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grille des plats signatures */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredSignatures.map((dish, idx) => (
              <motion.div
                key={dish._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-card-premium rounded-3xl overflow-hidden flex flex-col justify-between group shadow-xl relative"
              >
                {/* Zone Image & Badges */}
                <div className="relative h-56 overflow-hidden bg-[#121217]">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#181820] via-transparent to-transparent opacity-90" />
                  
                  {/* Badge en haut à gauche */}
                  <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-[#F59E0B] border border-[#F59E0B]/40 text-[10px] font-heading font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                    {dish.badge}
                  </span>

                  {/* Temps et Calories en haut à droite */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
                    <Clock size={11} className="text-[#F59E0B]" />
                    <span>{dish.prepTime}</span>
                  </div>
                </div>

                {/* Contenu et Détails */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-heading font-black text-lg text-white uppercase group-hover:text-[#F59E0B] transition-colors line-clamp-1">
                        {dish.name}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                      {dish.description}
                    </p>
                  </div>

                  {/* Tags d'ingrédients */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {dish.tags.map((t) => (
                      <span key={t} className="text-[10px] bg-white/5 text-gray-300 px-2 py-0.5 rounded-md font-medium border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Prix & Bouton Ajout au Panier */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] text-gray-400 block uppercase font-heading">Prix Gourmet</span>
                      <span className="text-2xl font-heading font-black text-[#F59E0B]">
                        {dish.price.toFixed(2)} DT
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05, backgroundColor: '#FBBF24' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickAddToCart(dish)}
                      className="bg-[#F59E0B] text-black font-heading font-black text-xs uppercase px-4 py-3 rounded-xl shadow-lg shadow-[#F59E0B]/20 flex items-center gap-2 transition-all"
                    >
                      <span>AJOUTER</span>
                      <ShoppingBag size={15} className="stroke-[2.5]" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bouton Voir tout le menu en bas de la grille */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/menu')}
            className="btn-dark px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:border-[#F59E0B] hover:text-[#F59E0B] inline-flex items-center gap-3"
          >
            <span>DÉCOUVRIR L'INTÉGRALITÉ DE NOTRE CARTE (30+ PLATS)</span>
            <ArrowRight size={16} />
          </motion.button>
        </div>

      </section>

      {/* =========================================================
          SECTION 3 : BENTO GRID "DÉCOUVRE NOS UNIVERS"
      ========================================================= */}
      <section className="container-custom py-16 sm:py-24 relative z-10 border-t border-white/5">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 space-y-3"
        >
          <span className="badge-gold inline-flex items-center gap-1.5">
            <Sparkles size={13} /> ★ EXPÉRIENCE CULINAIRE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black uppercase tracking-tight text-white">
            DÉCOUVRE NOS UNIVERS
          </h2>
          <div className="w-16 h-1 bg-[#F59E0B] rounded-full mx-auto" />
        </motion.div>

        {/* Grille Bento Asymétrique (3 Colonnes en PC, 1 en mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Bento Item 1 (Principal - Span 2 colonnes) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate('/menu')}
            className="md:col-span-2 bento-item-hero p-8 sm:p-10 flex flex-col justify-between group cursor-pointer relative min-h-[320px] sm:min-h-[360px]"
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={univers[0].image}
                alt={univers[0].title}
                className="w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#121217] via-[#121217]/80 to-transparent" />
            </div>

            <div className="space-y-4 z-10 relative max-w-lg">
              <span className="bg-[#F59E0B] text-black font-heading font-black text-xs uppercase px-3 py-1 rounded-full shadow-md inline-block">
                {univers[0].badge}
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight group-hover:text-[#F59E0B] transition-colors leading-tight">
                {univers[0].title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {univers[0].subtitle}
              </p>
            </div>

            <div className="z-10 relative pt-6 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 group-hover:underline">
                Explorer les recettes ▸
              </span>
              <motion.div 
                whileHover={{ scale: 1.15, x: 5 }}
                className="w-12 h-12 rounded-full bg-[#F59E0B] text-black flex items-center justify-center shadow-xl shadow-[#F59E0B]/30"
              >
                <ArrowRight size={20} className="stroke-[3]" />
              </motion.div>
            </div>
          </motion.div>

          {/* Bento Item 2 : Salades Croquantes (Span 1 colonne) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            onClick={() => navigate('/menu')}
            className="bento-item-hero p-8 flex flex-col justify-between group cursor-pointer relative min-h-[320px] sm:min-h-[360px]"
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={univers[1].image}
                alt={univers[1].title}
                className="w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-[#121217]/70 to-transparent" />
            </div>

            <div className="space-y-3 z-10 relative">
              <span className="bg-white/10 text-white border border-white/20 font-heading font-bold text-[10px] uppercase px-3 py-1 rounded-full inline-block">
                {univers[1].badge}
              </span>
              <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tight group-hover:text-[#F59E0B] transition-colors">
                {univers[1].title}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {univers[1].subtitle}
              </p>
            </div>

            <div className="z-10 relative pt-4 flex items-center justify-end">
              <motion.div 
                whileHover={{ scale: 1.15, x: 5 }}
                className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-[#F59E0B] text-white group-hover:text-black flex items-center justify-center transition-all"
              >
                <ArrowRight size={18} className="stroke-[2.5]" />
              </motion.div>
            </div>
          </motion.div>

          {/* Bento Item 3 : Accompagnements (Span 1 colonne) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => navigate('/menu')}
            className="bento-item-hero p-8 flex flex-col justify-between group cursor-pointer relative min-h-[320px]"
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={univers[2].image}
                alt={univers[2].title}
                className="w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-[#121217]/70 to-transparent" />
            </div>

            <div className="space-y-3 z-10 relative">
              <span className="bg-white/10 text-white border border-white/20 font-heading font-bold text-[10px] uppercase px-3 py-1 rounded-full inline-block">
                {univers[2].badge}
              </span>
              <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tight group-hover:text-[#F59E0B] transition-colors">
                {univers[2].title}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {univers[2].subtitle}
              </p>
            </div>

            <div className="z-10 relative pt-4 flex items-center justify-end">
              <motion.div 
                whileHover={{ scale: 1.15, x: 5 }}
                className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-[#F59E0B] text-white group-hover:text-black flex items-center justify-center transition-all"
              >
                <ArrowRight size={18} className="stroke-[2.5]" />
              </motion.div>
            </div>
          </motion.div>

          {/* Bento Item 4 : Boissons & Desserts (Span 2 colonnes) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => navigate('/menu')}
            className="md:col-span-2 bento-item-hero p-8 sm:p-10 flex flex-col justify-between group cursor-pointer relative min-h-[320px]"
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <img
                src={univers[3].image}
                alt={univers[3].title}
                className="w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#121217] via-[#121217]/80 to-transparent" />
            </div>

            <div className="space-y-4 z-10 relative max-w-lg">
              <span className="bg-[#F59E0B] text-black font-heading font-black text-xs uppercase px-3 py-1 rounded-full shadow-md inline-block">
                {univers[3].badge}
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-4xl text-white uppercase tracking-tight group-hover:text-[#F59E0B] transition-colors leading-tight">
                {univers[3].title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {univers[3].subtitle}
              </p>
            </div>

            <div className="z-10 relative pt-6 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 group-hover:underline">
                Voir les boissons & milkshakes ▸
              </span>
              <motion.div 
                whileHover={{ scale: 1.15, x: 5 }}
                className="w-12 h-12 rounded-full bg-[#F59E0B] text-black flex items-center justify-center shadow-xl shadow-[#F59E0B]/30"
              >
                <ArrowRight size={20} className="stroke-[3]" />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* =========================================================
          SECTION 4 : LE CONCEPT GOURMET 2.0 / ARTISANAT & IA
      ========================================================= */}
      <section className="container-custom py-16 sm:py-24 relative z-10 border-t border-white/5">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6 text-center lg:text-left"
          >
            <span className="badge-gold inline-flex items-center gap-1.5">
              <ChefHat size={14} /> ★ PHILOSOPHIE BURGER.HOUSE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black uppercase tracking-tight text-white leading-tight">
              L'ALLIANCE DE <span className="text-[#F59E0B]">L'ARTISANAT</span> ET DE L'INNOVATION
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Nous avons réinventé le burger gourmet en combinant le savoir-faire traditionnel de nos artisans boulangers et bouchers avec une intelligence artificielle culinaire unique qui personnalise chaque bouchée.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate('/a-propos')}
                className="btn-dark px-6 py-3.5 text-xs font-bold uppercase tracking-wider hover:border-[#F59E0B]"
              >
                DÉCOUVRIR NOTRE HISTOIRE
              </motion.button>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <CheckCircle2 size={16} className="text-[#F59E0B]" />
                <span>100% Viande Française & Locale</span>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card-premium p-6 rounded-3xl space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] text-2xl">
                🥖
              </div>
              <h4 className="font-heading font-bold text-lg text-white uppercase tracking-wider">
                PAIN BRIOCHÉ MAISON
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Pétri, levé et doré au four chaque matin par notre artisan boulanger pour un moelleux incomparable et une croûte croustillante au sésame.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card-premium p-6 rounded-3xl space-y-3 border-amber-500/30"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] text-2xl">
                🤖
              </div>
              <h4 className="font-heading font-bold text-lg text-white uppercase tracking-wider">
                SOMMELIER IA & 3D
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Notre algorithme exclusif analyse vos goûts en temps réel et calcule l'équilibre parfait de vos ingrédients dans notre studio 3D.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card-premium p-6 rounded-3xl space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] text-2xl">
                🥩
              </div>
              <h4 className="font-heading font-bold text-lg text-white uppercase tracking-wider">
                PUR BŒUF ANGUS GRILLÉ
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Zéro surgelé : des pièces d'exception hachées à la commande et saisies sur plaque brûlante pour une caramélisation Smash parfaite.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="glass-card-premium p-6 rounded-3xl space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] text-2xl">
                🌿
              </div>
              <h4 className="font-heading font-bold text-lg text-white uppercase tracking-wider">
                CIRCUITS COURTS & BIO
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Tomates de verger, salades croquantes locales et fromages AOP affinés 12 mois. Emballages 100% recyclables et éco-responsables.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 5 : AVIS CLIENTS VÉRIFIÉS & SOCIAL PROOF
      ========================================================= */}
      <section className="container-custom py-16 sm:py-24 relative z-10 border-t border-white/5">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <span className="badge-gold inline-flex items-center gap-1.5">
            <Award size={14} /> ★ +15 000 GOURMETS CONQUIS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black uppercase tracking-tight text-white">
            ILS EN PARLENT MIEUX QUE NOUS
          </h2>
          <div className="w-16 h-1 bg-[#F59E0B] rounded-full mx-auto" />
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Découvrez pourquoi notre communauté note nos créations <strong className="text-white">4.9 / 5</strong> sur l'ensemble des plateformes gastronomiques.
          </p>
        </motion.div>

        {/* Grille d'Avis authentiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div 
            whileHover={{ y: -6 }}
            className="glass-card-premium p-8 rounded-3xl space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex text-[#F59E0B]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} fill="#F59E0B" />
                  ))}
                </div>
                <span className="text-[10px] font-bold bg-[#F59E0B]/20 text-[#F59E0B] px-2.5 py-1 rounded-full uppercase border border-[#F59E0B]/30 flex items-center gap-1">
                  <ShieldCheck size={12} /> Achat Vérifié
                </span>
              </div>
              <p className="text-sm text-gray-200 italic leading-relaxed">
                "Le meilleur smash burger que j'ai mangé de toute ma vie ! La personnalisation 3D sur le site est dingue et la qualité des ingrédients surpasse tous les restos de la ville. Le pain brioché est un nuage."
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <img className="w-10 h-10 rounded-full object-cover ring-2 ring-[#F59E0B]" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Thomas" />
              <div>
                <h5 className="font-heading font-bold text-sm text-white">Thomas L.</h5>
                <p className="text-[11px] text-gray-400">Foodie & Vlogger Gastronomique</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -6 }}
            className="glass-card-premium p-8 rounded-3xl space-y-5 flex flex-col justify-between border-amber-500/30"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex text-[#F59E0B]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} fill="#F59E0B" />
                  ))}
                </div>
                <span className="text-[10px] font-bold bg-[#F59E0B]/20 text-[#F59E0B] px-2.5 py-1 rounded-full uppercase border border-[#F59E0B]/30 flex items-center gap-1">
                  <ShieldCheck size={12} /> Achat Vérifié
                </span>
              </div>
              <p className="text-sm text-gray-200 italic leading-relaxed">
                "Livraison en 25 minutes chrono, les frites de patate douce étaient encore brûlantes ! L'alliance de la truffe et du cheddar affiné est un véritable chef-d'œuvre. Je recommande les yeux fermés."
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <img className="w-10 h-10 rounded-full object-cover ring-2 ring-[#F59E0B]" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Sarah" />
              <div>
                <h5 className="font-heading font-bold text-sm text-white">Sarah M.</h5>
                <p className="text-[11px] text-gray-400">Membre Club Gourmet VIP</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -6 }}
            className="glass-card-premium p-8 rounded-3xl space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex text-[#F59E0B]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={16} fill="#F59E0B" />
                  ))}
                </div>
                <span className="text-[10px] font-bold bg-[#F59E0B]/20 text-[#F59E0B] px-2.5 py-1 rounded-full uppercase border border-[#F59E0B]/30 flex items-center gap-1">
                  <ShieldCheck size={12} /> Achat Vérifié
                </span>
              </div>
              <p className="text-sm text-gray-200 italic leading-relaxed">
                "La réduction de -20% pour les étudiants est un vrai cadeau pour une qualité pareille. L'application en 1 clic est super fluide et l'accueil en restaurant est toujours au top !"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <img className="w-10 h-10 rounded-full object-cover ring-2 ring-[#F59E0B]" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Julien" />
              <div>
                <h5 className="font-heading font-bold text-sm text-white">Julien & Clara</h5>
                <p className="text-[11px] text-gray-400">Étudiants & Habituation du Jeudi</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* =========================================================
          SECTION 6 : BANDEAU DU BAS (PROMOS VIP & CLUB GOURMET)
      ========================================================= */}
      <section className="container-custom pb-16 relative z-10">
        
        {/* Les 3 Cartes Atouts : ÉTUDIANT, FIDÉLITÉ, APP */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
          
          {/* Bloc 1 : ÉTUDIANT ? -20% */}
          <motion.div 
            whileHover={{ y: -5, borderColor: 'rgba(245, 158, 11, 0.6)' }}
            className="glass-card-premium rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px] group transition-all"
          >
            <div className="flex items-start gap-4 z-10 relative max-w-[70%]">
              <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] shrink-0 shadow-inner">
                <GraduationCap size={26} />
              </div>
              <div>
                <h4 className="font-heading font-black text-lg sm:text-xl text-white uppercase tracking-wider">
                  ÉTUDIANT ?
                </h4>
                <p className="text-xs sm:text-sm text-gray-400 mt-1.5 leading-relaxed">
                  <strong className="text-[#F59E0B] font-bold">-20%</strong> sur tout ton menu gourmet sur présentation de ta carte étudiante !
                </p>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-36 h-36 sm:w-40 sm:h-40 z-0 opacity-80 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
              <img 
                src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=400&q=80" 
                alt="Menu étudiant" 
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Bloc 2 : FIDÉLITÉ RÉCOMPENSÉE */}
          <motion.div 
            whileHover={{ y: -5, borderColor: 'rgba(245, 158, 11, 0.6)' }}
            className="glass-card-premium rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px] group transition-all"
          >
            <div className="flex items-start gap-4 z-10 relative">
              <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] shrink-0 shadow-inner">
                <Gift size={26} />
              </div>
              <div>
                <h4 className="font-heading font-black text-lg sm:text-xl text-white uppercase tracking-wider">
                  FIDÉLITÉ RÉCOMPENSÉE
                </h4>
                <p className="text-xs sm:text-sm text-gray-400 mt-1.5 leading-relaxed">
                  Cumule des points à chaque commande et profite d'offres exclusives et de burgers offerts !
                </p>
              </div>
            </div>

            <div className="pt-6 z-10 relative">
              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: '#FBBF24' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/offres')}
                className="btn-gold text-xs uppercase px-6 py-3 rounded-xl shadow-lg w-full sm:w-auto transition-all"
              >
                DÉCOUVRIR LE PROGRAMME VIP
              </motion.button>
            </div>
          </motion.div>

          {/* Bloc 3 : COMMANDE EN 1 CLIC */}
          <motion.div 
            whileHover={{ y: -5, borderColor: 'rgba(245, 158, 11, 0.6)' }}
            className="glass-card-premium rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px] group transition-all"
          >
            <div className="flex items-start gap-4 z-10 relative">
              <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] shrink-0 shadow-inner">
                <Smartphone size={26} />
              </div>
              <div>
                <h4 className="font-heading font-black text-lg sm:text-xl text-white uppercase tracking-wider">
                  COMMANDE EN 1 CLIC
                </h4>
                <p className="text-xs sm:text-sm text-gray-400 mt-1.5 leading-relaxed">
                  Télécharge notre application et commande où que tu sois avec suivi en temps réel !
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-6 z-10 relative">
              <a href="#" className="bg-black border border-white/20 hover:border-[#F59E0B] px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all hover:scale-105 shadow-md">
                <span className="text-base">🍎</span>
                <div className="text-[10px] leading-tight font-bold">
                  <span className="block text-gray-400 font-normal text-[8px]">Télécharger dans</span>
                  <span>l'App Store</span>
                </div>
              </a>
              <a href="#" className="bg-black border border-white/20 hover:border-[#F59E0B] px-3.5 py-2 rounded-xl flex items-center gap-2 transition-all hover:scale-105 shadow-md">
                <span className="text-base">▶️</span>
                <div className="text-[10px] leading-tight font-bold">
                  <span className="block text-gray-400 font-normal text-[8px]">DISPONIBLE SUR</span>
                  <span>Google Play</span>
                </div>
              </a>
            </div>

            <div className="absolute -bottom-8 -right-8 w-40 h-40 z-0 opacity-15 group-hover:opacity-25 transition-opacity pointer-events-none">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full text-[#F59E0B]">
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
                <path d="M12 18h.01"/>
              </svg>
            </div>
          </motion.div>

        </div>

        {/* Bannière VIP Newsletter Royale */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#181820] via-[#221D2C] to-[#181820] border-2 border-[#F59E0B]/50 rounded-3xl p-8 sm:p-12 shadow-[0_20px_60px_rgba(245,158,11,0.15)] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8"
        >
          <div className="absolute -right-20 -top-20 w-60 h-60 bg-[#F59E0B]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-3 text-center lg:text-left z-10 max-w-2xl">
            <span className="bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40 text-[10px] font-heading font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
              <Sparkles size={12} /> CLUB GOURMET PRIVILÈGE
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black uppercase text-white tracking-tight">
              REJOINS LE CLUB & REÇOIS <span className="text-[#F59E0B]">1 BURGER OFFERT</span>
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Inscris-toi pour recevoir nos invitations secrètes à la dégustation des nouvelles recettes du Chef, -15% sur ta première commande, et ton burger offert le jour de ton anniversaire !
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto z-10 shrink-0">
            <input
              type="email"
              placeholder="Ton adresse e-mail gourmet..."
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="input-dark px-6 py-4 rounded-2xl w-full sm:w-72 bg-[#0B0B0E]/90 border-white/20 focus:border-[#F59E0B] text-sm font-medium"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn-gold px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-wider whitespace-nowrap flex items-center justify-center gap-2 shadow-xl"
            >
              <span>REJOINDRE LE CLUB ✨</span>
            </motion.button>
          </form>
        </motion.div>

      </section>

    </div>
  );
};

export default Home;
