// src/pages/Offers.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Gift, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Offers = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    toast.success('Bienvenue dans la famille ! Surveillez votre boîte mail pour vos codes promo 🎁', {
      duration: 4000,
      icon: '🚀',
    });
    setEmail('');
  };

  const claimOffer = (offerName) => {
    toast.success(`Offre "${offerName}" activée ! Choisissez votre menu 🍔`, {
      duration: 3500,
      icon: '🏷️',
    });
    navigate('/menu');
  };

  return (
    <div className="min-h-screen pt-28 pb-24 overflow-hidden">
      <div className="container-custom space-y-16">
        
        {/* En-tête (Écran 05 • OFFRES & ACTUS) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto space-y-3"
        >
          <span className="badge-gold inline-block">★ Bons Plans & Promos</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight uppercase">
            NOS OFFRES <span className="text-[#F59E0B]">DU MOMENT</span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-full mx-auto shadow-md" />
        </motion.div>

        {/* --- GRILLE DES OFFRES MAQUETTE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Carte 1 : MENU ÉTUDIANT -20% */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -8, borderColor: 'rgba(245, 158, 11, 0.6)' }}
            className="bg-[#121217] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group transition-all"
          >
            <div className="p-8 sm:p-10 space-y-6">
              
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest block mb-1">
                    ★ Offre Spéciale
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-heading font-black uppercase text-white tracking-tight">
                    MENU ÉTUDIANT
                  </h3>
                </div>
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-2xl bg-[#F59E0B] text-black font-black text-xl flex items-center justify-center shadow-lg shadow-[#F59E0B]/30 shrink-0 rotate-12"
                >
                  -20%
                </motion.div>
              </div>

              {/* Image promo 1 */}
              <div className="h-64 rounded-2xl overflow-hidden relative border border-white/5 bg-black/40">
                <img
                  src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80"
                  alt="Menu Étudiant Burger House"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[11px] font-bold text-amber-300 uppercase">
                  Burger + Frites + Boisson
                </div>
              </div>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Sur présentation de la carte étudiante du lundi au vendredi jusqu'à 16h. Valable sur tous les menus classiques et signatures.
              </p>
            </div>

            <div className="px-8 pb-8 pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => claimOffer('Menu Étudiant -20%')}
                className="btn-gold w-full py-4 text-sm font-black tracking-wider uppercase shadow-lg shadow-[#F59E0B]/30 flex items-center justify-center gap-2"
              >
                J'EN PROFITE <Tag size={18} />
              </motion.button>
            </div>
          </motion.div>

          {/* Carte 2 : WEEK-END GOURMAND */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -8, borderColor: 'rgba(245, 158, 11, 0.6)' }}
            className="bg-[#121217] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group transition-all"
          >
            <div className="p-8 sm:p-10 space-y-6">
              
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest block mb-1">
                    ★ Week-end Spécial
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-heading font-black uppercase text-white tracking-tight">
                    WEEK-END GOURMAND
                  </h3>
                </div>
                <motion.div 
                  whileHover={{ rotate: -360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-2xl bg-[#F59E0B] text-black font-black text-xs text-center flex flex-col items-center justify-center shadow-lg shadow-[#F59E0B]/30 shrink-0 rotate-[-12deg] p-1"
                >
                  <span>1 BOISSON</span>
                  <span>OFFERTE</span>
                </motion.div>
              </div>

              {/* Image promo 2 */}
              <div className="h-64 rounded-2xl overflow-hidden relative border border-white/5 bg-black/40">
                <img
                  src="https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80"
                  alt="Week-end Gourmand Boisson Offerte"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-[11px] font-bold text-amber-300 uppercase">
                  Pour tout burger acheté
                </div>
              </div>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Pour tout burger acheté le week-end (samedi et dimanche) ! Profitez de notre thé glacé maison ou d'un soda bien frais offert.
              </p>
            </div>

            <div className="px-8 pb-8 pt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => claimOffer('Week-end Gourmand (Boisson Offerte)')}
                className="btn-gold w-full py-4 text-sm font-black tracking-wider uppercase shadow-lg shadow-[#F59E0B]/30 flex items-center justify-center gap-2"
              >
                J'EN PROFITE <Gift size={18} />
              </motion.button>
            </div>
          </motion.div>

        </div>

        {/* --- BANDEAU NEWSLETTER MAQUETTE ("RESTE À L'AFFÛT !") --- */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-r from-[#181820] via-[#1F1F2A] to-[#181820] border border-[#F59E0B]/40 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="max-w-2xl mx-auto text-center space-y-6 relative z-10">
            
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#F59E0B] flex items-center justify-center mx-auto text-3xl shadow-inner"
            >
              📨
            </motion.div>

            <h3 className="text-3xl sm:text-4xl font-heading font-black uppercase text-white">
              RESTE À L'AFFÛT !
            </h3>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Inscris-toi à notre newsletter pour recevoir nos offres exclusives, nos codes promo surprises et découvrir nos nouveaux burgers éphémères en avant-première.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-4 max-w-lg mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ton email..."
                className="input-dark flex-1 text-sm py-4 rounded-xl shadow-inner bg-[#121217] border border-white/10 px-4 text-white focus:border-[#F59E0B] transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="btn-gold text-xs uppercase font-black px-8 py-4 shrink-0 flex items-center justify-center gap-2"
              >
                <span>S'INSCRIRE</span> <Send size={16} />
              </motion.button>
            </form>

            <p className="text-[11px] text-gray-500 pt-2">
              🔒 Pas de spam. Vous pouvez vous désinscrire à tout moment.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Offers;
