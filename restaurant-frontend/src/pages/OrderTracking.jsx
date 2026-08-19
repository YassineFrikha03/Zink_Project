// src/pages/OrderTracking.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ChefHat, Bike, Home, Phone, HelpCircle, RefreshCw, Sparkles, MapPin, User, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchOrderById, updateOrderStatus } from '../services/api';
import toast from 'react-hot-toast';

const OrderTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);

  // Charger la commande depuis l'API backend
  const loadOrder = async () => {
    try {
      if (id && id !== 'demo' && !id.startsWith('BH-')) {
        const res = await fetchOrderById(id);
        if (res && res.data) {
          setOrder(res.data);
          return;
        }
      }
      // Données par défaut ou démo conformes à la maquette
      setOrder({
        _id: id || 'BH-2026-1578',
        status: 'En préparation',
        orderType: 'Livraison',
        totalAmount: 20.40,
        customerInfo: {
          name: 'Client Gourmet',
          email: 'client@burgerhouse.fr',
          phone: '06 12 34 56 78',
          address: '23 rue des Saveurs, 75011 Paris',
        },
        items: [
          {
            name: 'Smash Cheese',
            quantity: 1,
            price: 11.50,
            dish: { image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
          },
          {
            name: 'Frites maison',
            quantity: 1,
            price: 3.50,
            dish: { image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80' },
          },
          {
            name: 'Coca Cola',
            quantity: 1,
            price: 2.50,
            dish: { image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80' },
          },
        ],
      });
    } catch (error) {
      console.error('Erreur chargement commande:', error);
      toast.error('Commande introuvable ou erreur serveur. Affichage du suivi démo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
    const interval = setInterval(loadOrder, 10000);
    return () => clearInterval(interval);
  }, [id]);

  // Étapes de la timeline et mapping du statut
  const steps = [
    { label: 'COMMANDE REÇUE', time: '10:22', icon: CheckCircle, status: 'En attente' },
    { label: 'EN PRÉPARATION', time: '10:35', icon: ChefHat, status: 'En préparation' },
    { label: 'EN LIVRAISON', time: '10:50', icon: Bike, status: 'En livraison' },
    { label: 'LIVRÉE', time: '--:--', icon: Home, status: 'Livrée' },
  ];

  // Calcul de l'étape active (0 à 3)
  const getActiveStepIndex = (currentStatus) => {
    if (!currentStatus) return 1;
    if (currentStatus === 'En attente') return 0;
    if (currentStatus === 'En préparation' || currentStatus === 'Prête') return 1;
    if (currentStatus === 'En livraison') return 2;
    if (currentStatus === 'Livrée') return 3;
    return 1;
  };

  const currentStepIndex = order ? getActiveStepIndex(order.status) : 1;

  // Simulation interactive de la commande
  const handleSimulateNextStep = async () => {
    if (!order) return;
    setSimulating(true);

    const nextIndex = (currentStepIndex + 1) % steps.length;
    const nextStatus = steps[nextIndex].status;

    try {
      if (order._id && !order._id.startsWith('BH-')) {
        await updateOrderStatus(order._id, { status: nextStatus });
        toast.success(`Statut mis à jour : ${steps[nextIndex].label} !`, { icon: '⚡' });
      } else {
        setOrder((prev) => ({ ...prev, status: nextStatus }));
        toast.success(`Simulation : Passage à "${steps[nextIndex].label}" !`, { icon: '✨' });
      }
      await loadOrder();
    } catch (err) {
      console.error('Erreur simulation:', err);
      setOrder((prev) => ({ ...prev, status: nextStatus }));
      toast.success(`Simulation locale : ${steps[nextIndex].label} !`);
    } finally {
      setSimulating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#F59E0B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Calculs financiers
  const subtotal = order.items
    ? order.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    : 17.50;
  const deliveryFee = order.orderType === 'Livraison' ? 2.50 : 0.00;
  const total = order.totalAmount || subtotal + deliveryFee;

  return (
    <div className="min-h-screen pt-28 pb-24 overflow-hidden">
      <div className="container-custom max-w-5xl space-y-12">
        
        {/* En-tête */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6"
        >
          <div>
            <button
              onClick={() => navigate('/menu')}
              className="text-xs text-gray-400 hover:text-[#F59E0B] flex items-center gap-1.5 mb-2 transition-colors font-bold"
            >
              <ArrowLeft size={16} /> Retour au menu
            </button>
            <h1 className="text-3xl sm:text-4xl font-heading font-black uppercase text-white">
              SUIVI DE <span className="text-[#F59E0B]">MA COMMANDE</span>
            </h1>
          </div>

          {/* Bouton Magique de Simulation */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(245, 158, 11, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSimulateNextStep}
            disabled={simulating}
            className="btn-gold text-xs uppercase px-5 py-3 font-black shadow-lg shadow-[#F59E0B]/30 self-start sm:self-auto flex items-center gap-2"
          >
            <Sparkles size={16} className={simulating ? 'animate-spin' : ''} />
            <span>Simuler étape suivante</span>
          </motion.button>
        </motion.div>

        {/* --- TIMELINE DU STATUT (Écran 06 • SUIVI DE COMMANDE) --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-[#121217] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isCompleted = idx < currentStepIndex;
              const isActive = idx === currentStepIndex;

              return (
                <motion.div
                  key={step.label}
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex flex-col items-center text-center relative ${
                    isActive ? 'scale-105' : isCompleted ? 'opacity-90' : 'opacity-40'
                  }`}
                >
                  {/* Icône du statut */}
                  <motion.div
                    animate={isActive ? { rotate: [0, -5, 5, 0], scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-4 transition-all shadow-xl ${
                      isActive
                        ? 'bg-[#F59E0B] text-black ring-8 ring-[#F59E0B]/20 animate-glow'
                        : isCompleted
                        ? 'bg-amber-500/20 border border-[#F59E0B]/60 text-[#F59E0B]'
                        : 'bg-[#181820] border border-white/10 text-gray-500'
                    }`}
                  >
                    <Icon size={32} className={isActive ? 'font-black' : ''} />
                  </motion.div>

                  {/* Label */}
                  <span
                    className={`font-heading font-black text-xs sm:text-sm uppercase tracking-wider ${
                      isActive ? 'text-[#F59E0B]' : isCompleted ? 'text-white' : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </span>

                  {/* Heure */}
                  <span className="text-xs text-gray-400 font-medium mt-1">
                    {isActive ? 'En cours...' : step.time}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Barre de progression de fond */}
          <div className="hidden lg:block absolute top-[72px] left-[12%] right-[12%] h-1 bg-[#181820] z-0">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] shadow-sm"
            />
          </div>
        </motion.div>

        {/* --- DÉTAILS & INFORMATIONS DE LIVRAISON (Maquette) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Colonne 1 & 2 : Détails de la commande */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 bg-[#121217] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
          >
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg text-white uppercase tracking-wider">
                DÉTAILS DE LA COMMANDE
              </h3>
              <span className="text-xs font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/30">
                #{order._id || 'BH-2026-1578'}
              </span>
            </div>

            {/* Liste des articles */}
            <div className="space-y-4 divide-y divide-white/5">
              {order.items &&
                order.items.map((item, index) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index} 
                    className="pt-4 first:pt-0 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          item.dish?.image ||
                          'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
                        }
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover bg-black/40 border border-white/5"
                      />
                      <div>
                        <h4 className="font-heading font-bold text-sm sm:text-base text-white">
                          {item.name}
                        </h4>
                        {item.selectedOptions && item.selectedOptions.length > 0 && (
                          <p className="text-xs text-gray-400">{item.selectedOptions.join(' • ')}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <span className="text-xs font-bold text-gray-400 bg-[#181820] px-2.5 py-1 rounded-md border border-white/5">
                        x{item.quantity}
                      </span>
                      <span className="font-heading font-black text-sm sm:text-base text-[#F59E0B] min-w-[60px] text-right">
                        {(item.price * item.quantity).toFixed(2).replace('.', ',')} DT
                      </span>
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* Récapitulatif Total */}
            <div className="border-t border-white/10 pt-6 space-y-2.5 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Sous-total</span>
                <span>{subtotal.toFixed(2).replace('.', ',')} DT</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Livraison</span>
                <span className="text-[#F59E0B] font-semibold">
                  {deliveryFee === 0 ? 'Offerte' : `${deliveryFee.toFixed(2).replace('.', ',')} DT`}
                </span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                <span className="font-heading font-bold text-base text-white">TOTAL</span>
                <span className="font-heading font-black text-2xl text-[#F59E0B]">
                  {total.toFixed(2).replace('.', ',')} DT
                </span>
              </div>
            </div>
          </motion.div>

          {/* Colonne 3 : Encadrés Livraison & Support (Maquette) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {/* Encadré Livraison */}
            <div className="bg-[#121217] border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
              <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider border-l-2 border-[#F59E0B] pl-2.5">
                LIVRAISON
              </h3>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs text-gray-500 block">Adresse de livraison</span>
                  <p className="text-white font-medium flex items-center gap-2 mt-1">
                    <MapPin size={16} className="text-[#F59E0B] shrink-0" />
                    <span>{order.customerInfo?.address || '23 rue des Saveurs, 75011 Paris'}</span>
                  </p>
                </div>

                <div className="border-t border-white/5 pt-3">
                  <span className="text-xs text-gray-500 block mb-2">Livreur assigné</span>
                  <div className="flex items-center gap-3 bg-[#181820] p-3 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-[#F59E0B] text-black flex items-center justify-center font-bold text-base">
                      👨‍🦱
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Livreur Burger House</p>
                      <p className="text-[11px] text-green-400 font-semibold">● En route vers le restaurant</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Encadré Support "BESOIN D'AIDE ?" (Maquette en bas à droite) */}
            <motion.div 
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-[#181820] to-[#121217] border border-[#F59E0B]/40 rounded-3xl p-6 shadow-2xl space-y-3 text-center transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-[#F59E0B]/20 text-[#F59E0B] flex items-center justify-center mx-auto">
                <Phone size={24} />
              </div>
              <h3 className="font-heading font-black text-base text-white uppercase tracking-wider">
                BESOIN D'AIDE ?
              </h3>
              <p className="font-heading font-black text-2xl text-[#F59E0B]">
                01 23 45 67 89
              </p>
              <p className="text-xs text-gray-400">
                Nous sommes là pour toi ! Notre équipe support répond 7j/7 en direct.
              </p>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default OrderTracking;
