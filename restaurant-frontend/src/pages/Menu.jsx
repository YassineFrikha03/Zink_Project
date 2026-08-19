// src/pages/Menu.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Sparkles, Clock, AlertCircle, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchDishes } from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import ProductModal from '../components/ProductModal';

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('TOUS');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDishModal, setSelectedDishModal] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [showClientModal, setShowClientModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [pendingDish, setPendingDish] = useState(null);

  const handleOpenClientModal = (dish = null) => {
    setPendingDish(dish);
    setShowClientModal(true);
  };

  const handleClientSubmit = (e) => {
    e.preventDefault();
    if (!clientName.trim()) {
      toast.error('Veuillez entrer votre nom.');
      return;
    }
    localStorage.setItem('zink_client_name', clientName.trim());
    setShowClientModal(false);
    
    if (pendingDish) {
      toast.success(`Bienvenue ${clientName.trim()} ! Personnalisation de : ${pendingDish.name} 🍔`, { icon: '✨', style: { background: 'var(--bg-toast)', color: 'var(--color-toast)', border: '1px solid #F59E0B' } });
      navigate('/creer-mon-burger', { state: { selectedDish: pendingDish } });
    } else {
      toast.success(`Bienvenue ${clientName.trim()} ! Créez votre burger sur mesure.`, { icon: '✨', style: { background: 'var(--bg-toast)', color: 'var(--color-toast)', border: '1px solid #F59E0B' } });
      navigate('/creer-mon-burger');
    }
  };

  const categories = [
    { id: 'TOUS', label: 'Tous', icon: '✨' },
    { id: 'Signatures', label: 'Signatures', icon: '👑' },
    { id: 'Classiques', label: 'Classiques', icon: '🍔' },
    { id: 'Poulet', label: 'Poulet', icon: '🍗' },
    { id: 'Végétariens', label: 'Végétariens', icon: '🥗' },
    { id: 'Accompagnements', label: 'Accompagnements', icon: '🍟' },
    { id: 'Boissons', label: 'Boissons', icon: '🥤' },
  ];

  // Spécialités authentiques du restaurant Le Zink Tunisie (El Menzah & La Marsa)
  const zinkDishes = [
    {
      _id: 'zink-1',
      name: 'Le Tornado Burger',
      price: 41.90,
      description: 'Double steak haché pur bœuf, filet de bœuf, cheddar fondant, chorizo ou bacon croustillant, poivron grillé et sauce pesto.',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
      category: 'Signatures',
      prepTime: '15 min',
      tags: ['#FiletDeBoeuf', '#Pesto', '#Énorme']
    },
    {
      _id: 'zink-2',
      name: 'Le Deluxe Burger',
      price: 40.00,
      description: 'Filet de bœuf tendre, camembert rôti, cheddar coulant, bacon croustillant, champignons sautés et sauce BBQ.',
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
      category: 'Signatures',
      prepTime: '14 min',
      tags: ['#Camembert', '#Filet', '#BBQ']
    },
    {
      _id: 'zink-3',
      name: 'Le Zinkoholic Burger',
      price: 32.90,
      description: 'Steak de 180g, oignons caramélisés fondants, triple portion de cheddar, dinde fumée et bacon croustillant.',
      image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
      category: 'Signatures',
      prepTime: '12 min',
      tags: ['#TripleCheddar', '#Bacon', '#Gourmand']
    },
    {
      _id: 'zink-4',
      name: 'Le Terre à Terre Burger',
      price: 32.90,
      description: 'L\'expérience rustique du Zink : bœuf savoureux, champignons forestiers et fromages fondus pour les amoureux de la terre.',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
      category: 'Classiques',
      prepTime: '12 min',
      tags: ['#Champignons', '#Authentique']
    },
    {
      _id: 'zink-5',
      name: 'Le Dingue de Toi',
      price: 29.90,
      description: 'Steak juteux 180g, double cheddar affiné, tranches de dinde fumée, sauce césar maison et roquette poivrée.',
      image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80',
      category: 'Classiques',
      prepTime: '11 min',
      tags: ['#SauceCésar', '#Roquette', '#DindeFumée']
    },
    {
      _id: 'zink-6',
      name: 'Le Berlusconi',
      price: 29.90,
      description: 'L\'Italie dans un burger : Bœuf, cœur de burrata crémeuse, gorgonzola de caractère, éclats de parmesan et sauce pesto.',
      image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
      category: 'Classiques',
      prepTime: '13 min',
      tags: ['#Burrata', '#Gorgonzola', '#Pesto']
    },
    {
      _id: 'zink-7',
      name: 'Le Johnny Depp',
      price: 28.90,
      description: 'Bœuf grillé, cheddar onctueux, rondelles de chorizo épicé et purée de guacamole frais.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      category: 'Classiques',
      prepTime: '10 min',
      tags: ['#Chorizo', '#Guacamole', '#Épicé']
    },
    {
      _id: 'zink-8',
      name: 'Le Chicken César Burger',
      price: 19.90,
      description: 'Généreux filet de poulet pané, parmesan, salade croquante et la fameuse sauce César.',
      image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80',
      category: 'Poulet',
      prepTime: '11 min',
      tags: ['#PouletPané', '#César']
    },
    {
      _id: 'zink-9',
      name: 'L\'Herbivore',
      price: 23.90,
      description: 'Galette végétarienne fondante, légumes grillés de saison, fromage et sauce légère.',
      image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=800&q=80',
      category: 'Végétariens',
      prepTime: '10 min',
      tags: ['#Veggie', '#LégumesGrillés']
    },
    {
      _id: 'zink-10',
      name: 'Salade Burrata',
      price: 31.90,
      description: 'Généreuse boule de burrata italienne, tomates cerises, basilic frais, huile d\'olive extra vierge.',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      category: 'Accompagnements',
      prepTime: '8 min',
      tags: ['#Burrata', '#Fraîcheur']
    },
    {
      _id: 'zink-11',
      name: 'Salade César',
      price: 24.90,
      description: 'Salade romaine croquante, filet de poulet grillé, croûtons à l\'ail, parmesan et sauce César onctueuse.',
      image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80',
      category: 'Accompagnements',
      prepTime: '8 min',
      tags: ['#César', '#PouletGrillé']
    },
    {
      _id: 'zink-12',
      name: 'Limonade Artisanale',
      price: 4.00,
      description: 'Boisson rafraîchissante au citron frais et menthe pour accompagner votre burger.',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
      category: 'Boissons',
      prepTime: '2 min',
      tags: ['#Citron', '#Menthe']
    }
  ];

  useEffect(() => {
    const loadDishes = async () => {
      setLoading(true);
      try {
        const storedCustomDishes = localStorage.getItem('zink_custom_dishes');
        const storedAvailability = JSON.parse(localStorage.getItem('zink_dishes_availability') || '{}');

        if (storedCustomDishes) {
          const parsed = JSON.parse(storedCustomDishes);
          setDishes(parsed);
          return;
        }

        const res = await fetchDishes();
        let loaded = (res && res.data && res.data.length > 0) ? res.data : zinkDishes;

        // Appliquer les disponibilités gérées par le chef/admin
        loaded = loaded.map(d => ({
          ...d,
          isAvailable: storedAvailability[d._id] !== undefined ? storedAvailability[d._id] : (d.isAvailable !== undefined ? d.isAvailable : true)
        }));

        setDishes(loaded);
      } catch (err) {
        console.error('Erreur ou mode hors ligne, chargement du menu Le Zink:', err);
        const storedCustomDishes = localStorage.getItem('zink_custom_dishes');
        if (storedCustomDishes) {
          setDishes(JSON.parse(storedCustomDishes));
        } else {
          setDishes(zinkDishes);
        }
      } finally {
        setLoading(false);
      }
    };
    loadDishes();
    window.addEventListener('storage', loadDishes);
    return () => window.removeEventListener('storage', loadDishes);
  }, []);

  // Filtrage des plats par onglet et par recherche
  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory =
      activeTab === 'TOUS' ||
      dish.category === activeTab ||
      (activeTab === 'Végétariens' && dish.isVegetarian === true);

    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (dish.description && dish.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (dish.ingredients && dish.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="container-custom">
        
        {/* --- EN-TÊTE DU MENU (Écran 02 • MENU) --- */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 space-y-4"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] font-bold text-xs uppercase tracking-widest mb-2 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
          >
            ★ Qualité & Savoir-Faire
          </motion.div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black tracking-tight uppercase drop-shadow-2xl">
            NOTRE <span className="text-gradient-gold">MENU</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-lg max-w-xl mx-auto leading-relaxed pt-2 font-medium">
            Des recettes exclusives préparées à la commande. Pains briochés toastés, viandes premium sélectionnées et sauces maison généreuses.
          </p>
        </motion.div>

        {/* --- BARRE DE RECHERCHE --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-md mx-auto mb-12 relative"
        >
          <Search size={18} className="absolute left-4 top-3.5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un burger, une frite, une boisson..."
            className="input-dark pl-11 py-3 text-sm shadow-inner w-full rounded-full border border-white/10 focus:border-[#F59E0B] transition-all bg-[#181820]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-xs text-gray-400 hover:text-white"
            >
              Effacer
            </button>
          )}
        </motion.div>
        {/* --- ONGLETS DE FILTRES MAQUETTE --- */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center justify-start md:justify-center gap-2 sm:gap-3 overflow-x-auto pb-6 mb-10 no-scrollbar"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(cat.id)}
              className={`tab-pill whitespace-nowrap px-6 py-3 shrink-0 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 border ${
                activeTab === cat.id 
                  ? 'bg-[#F59E0B] text-black border-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.4)]' 
                  : 'bg-[#181820] text-gray-300 border-white/10 hover:border-white/30 hover:bg-white/5'
              }`}
            >
              <span className="text-base">{cat.icon}</span>
              <span>{cat.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* --- GRILLE DE PRODUITS --- */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-96 bg-[#181820] rounded-2xl animate-pulse border border-white/5" />
            ))}
          </div>
        ) : filteredDishes.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#181820] border border-white/5 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4"
          >
            <AlertCircle size={48} className="text-[#F59E0B] mx-auto opacity-80" />
            <h3 className="font-heading font-bold text-xl text-white">Aucun produit trouvé</h3>
            <p className="text-sm text-gray-400">
              Essayez une autre catégorie ou modifiez votre recherche.
            </p>
            <button
              onClick={() => {
                setActiveTab('TOUS');
                setSearchQuery('');
              }}
              className="btn-gold text-xs uppercase px-6 py-2.5 mt-2"
            >
              VOIR TOUS LES PRODUITS
            </button>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {/* Carte Spéciale : CRÉATION SUR MESURE (Affichée uniquement sur TOUS ou Signatures) */}
              {(activeTab === 'TOUS' || activeTab === 'Signatures') && !searchQuery && (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ y: -8 }}
                  onClick={() => handleOpenClientModal()}
                  className="keep-dark card-dark flex flex-col justify-between group relative bg-gradient-to-br from-[#1E1B2E] via-[#2A243E] to-[#121217] border-2 border-[#F59E0B]/40 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:shadow-[0_15px_40px_rgba(245,158,11,0.3)] transition-all duration-300 cursor-pointer"
                >
                  {/* Image & Badge */}
                  <div className="relative h-60 overflow-hidden bg-[#121217] flex items-center justify-center border-b border-[#F59E0B]/20">
                    <div className="absolute inset-0 bg-[#F59E0B]/5 backdrop-blur-sm z-0" />
                    <Sparkles className="w-24 h-24 text-[#F59E0B] animate-pulse z-10 drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
                    <div className="absolute top-3.5 left-3.5 z-20">
                      <span className="badge-gold">✨ IA & 3D</span>
                    </div>
                  </div>

                  {/* Contenu de la carte */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-heading font-black text-2xl text-white group-hover:text-[#F59E0B] transition-colors leading-tight uppercase">
                        Burger Sur Mesure
                      </h3>
                      <p className="text-sm text-gray-300 leading-relaxed font-medium pb-2">
                        Devenez le chef. Utilisez notre Atelier 3D pour assembler votre burger parfait ou laissez notre Sommelier IA vous surprendre.
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {['#Atelier3D', '#IA', '#SurMesure'].map((tag, idx) => (
                          <span key={idx} className="text-[10px] font-bold uppercase tracking-wider text-[#F59E0B] bg-[#F59E0B]/10 px-2.5 py-1 rounded-md border border-[#F59E0B]/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-[#F59E0B] to-amber-500 text-black font-black text-xs uppercase px-5 py-3 rounded-xl shadow-lg flex items-center gap-2"
                      >
                        <Sparkles size={16} />
                        <span>Démarrer l'Atelier</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Reste des plats standards */}
              {filteredDishes.map((dish) => {
                const isBurger = dish.category !== 'Accompagnements' && dish.category !== 'Boissons';
                return (
                  <motion.div
                    layout
                    key={dish._id || dish.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35 }}
                    whileHover={{ y: -8 }}
                    onClick={() => {
                      if (dish.isAvailable === false) {
                        toast.error(`"${dish.name}" est actuellement en rupture de stock.`, { icon: '🚨' });
                        return;
                      }
                      setSelectedDishModal(dish);
                    }}
                    className={`card-dark flex flex-col justify-between group relative bg-[#181820] border rounded-3xl overflow-hidden shadow-xl transition-all duration-300 ${
                      dish.isAvailable === false 
                        ? 'opacity-65 border-red-500/30 cursor-not-allowed' 
                        : isBurger 
                        ? 'border-white/5 hover:border-[#F59E0B]/50 hover:shadow-[0_15px_40px_rgba(245,158,11,0.2)] hover:-translate-y-2 cursor-pointer' 
                        : 'border-white/5 hover:border-white/30 hover:shadow-2xl hover:-translate-y-2'
                    }`}
                  >
                    {/* Image & Badge */}
                    <div className="relative h-60 overflow-hidden bg-black/50">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          dish.isAvailable === false ? 'grayscale' : 'group-hover:scale-110'
                        }`}
                      />
                      
                      {dish.isSignature && (
                        <div className="absolute top-3.5 left-3.5">
                          <span className="badge-gold">★ Signature</span>
                        </div>
                      )}

                      {dish.isVegetarian && (
                        <div className="absolute top-3.5 right-3.5 bg-green-500/20 border border-green-500/50 text-green-400 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          🌱 Veggie
                        </div>
                      )}

                      {dish.isAvailable === false && (
                        <div className="absolute inset-0 bg-red-950/85 backdrop-blur-[2px] flex items-center justify-center z-20">
                          <span className="px-4 py-2 rounded-xl bg-red-600 text-white font-black text-xs uppercase tracking-wider shadow-2xl border border-red-400/50 flex items-center gap-1.5">
                            <AlertCircle size={14} />
                            RUPTURE DE STOCK
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Contenu de la carte */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-heading font-bold text-xl text-white group-hover:text-[#F59E0B] transition-colors leading-tight">
                            {dish.name}
                          </h3>
                          <span className="font-heading font-black text-lg text-[#F59E0B] shrink-0">
                            {Number(dish.price).toFixed(2).replace('.', ',')} DT
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                          {dish.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {dish.tags?.map((tag, idx) => (
                            <span key={idx} className="text-[9px] font-bold uppercase tracking-wider text-gray-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/10">
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* Indicateur de personnalisation pour les burgers */}
                        {isBurger && (
                          <div className="pt-1 flex items-center gap-1.5 text-xs text-[#F59E0B] font-bold group-hover:translate-x-1 transition-transform">
                            <Sparkles size={14} />
                            <span>Personnaliser ce burger →</span>
                          </div>
                        )}
                      </div>

                      {/* Bouton Rond [ + ] exactement comme sur la maquette */}
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
                          <Clock size={14} className="text-[#F59E0B]" />
                          <span>{dish.preparationTime || 12} min</span>
                        </span>

                        <motion.button
                          whileHover={{ scale: 1.15, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(dish);
                          }}
                          className="w-11 h-11 rounded-full bg-[#F59E0B] text-black flex items-center justify-center shadow-lg shadow-[#F59E0B]/30"
                          title="Ajouter directement au panier"
                        >
                          <Plus size={24} className="font-black" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* --- BOUTON MAQUETTE "VOIR TOUS LES PRODUITS" --- */}
        {activeTab !== 'TOUS' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('TOUS')}
              className="btn-gold text-xs uppercase px-8 py-4 font-black shadow-xl shadow-[#F59E0B]/30"
            >
              VOIR TOUS LES PRODUITS ({dishes.length})
            </motion.button>
          </motion.div>
        )}
      </div>

      <ProductModal
        isOpen={!!selectedDishModal}
        onClose={() => setSelectedDishModal(null)}
        dish={selectedDishModal}
        onAddToCart={(d) => {
          addToCart(d);
          toast.success(`${d.name} ajouté au panier !`, { style: { background: 'var(--bg-toast)', color: 'var(--color-toast)', border: '1px solid #F59E0B' } });
        }}
        onCustomize={(d) => {
          handleOpenClientModal(d);
        }}
      />

      {/* MODAL SÉLECTION CLIENT */}
      <AnimatePresence>
        {showClientModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#121217] border border-white/10 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative"
            >
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setShowClientModal(false)}
                  className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="p-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-[#F59E0B]/10 mx-auto flex items-center justify-center border border-[#F59E0B]/30 mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <User size={32} className="text-[#F59E0B]" />
                </div>
                
                <div>
                  <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tight mb-2">QUI ÊTES-VOUS ?</h3>
                  <p className="text-sm text-gray-400 font-medium">
                    Veuillez entrer votre nom avant de commencer à créer votre burger sur mesure.
                  </p>
                </div>

                <form onSubmit={handleClientSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Votre nom..."
                    className="w-full bg-[#181820] border border-white/10 focus:border-[#F59E0B] rounded-xl px-4 py-3.5 text-center text-white focus:outline-none transition-all placeholder:text-gray-600"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#F59E0B] to-amber-500 text-black font-black text-sm uppercase tracking-wider px-6 py-4 rounded-xl shadow-lg shadow-[#F59E0B]/20 hover:shadow-[#F59E0B]/40 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles size={18} />
                    <span>Créer mon burger</span>
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
