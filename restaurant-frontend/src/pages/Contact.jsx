// src/pages/Contact.jsx
import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [activeLocation, setActiveLocation] = useState('menzah');

  const locations = {
    menzah: {
      name: 'Le Zink Menzah 1',
      query: 'Le Zink, Menzah 1, Tunis'
    },
    marsa: {
      name: 'Le Zink La Marsa',
      query: 'Le Zink, La Marsa, Tunis'
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      toast.success('Merci pour votre message ! Notre équipe vous répondra très vite 🍔', {
        duration: 4000,
        icon: '💌',
      });
      setFormData({ name: '', email: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 overflow-hidden">
      <div className="container-custom">
        
        {/* En-tête */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-16 space-y-3"
        >
          <span className="badge-gold inline-block">★ Toujours à votre écoute</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight uppercase">
            NOUS <span className="text-[#F59E0B]">CONTACTER</span>
          </h1>
        </motion.div>

        {/* --- GRILLE PRINCIPALE (Écran 04 • CONTACT) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Colonne Gauche : Infos & Formulaire */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            {/* Titre & Coordonnées */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-heading font-black uppercase text-white">
                  VIENS NOUS VOIR
                </h2>
                <p className="font-script text-3xl sm:text-4xl text-[#F59E0B] font-bold mt-1">
                  On t'attend !
                </p>
              </div>

              <ul className="space-y-5 text-sm sm:text-base">
                <li className="flex items-start gap-4 text-gray-300">
                  <div className="w-11 h-11 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] shrink-0 mt-0.5">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="font-bold tracking-wide uppercase text-white block">
                      EL MENZAH 1 : 1 RUE SALAH BEN MAHMOUD, TUNIS
                    </span>
                    <span className="text-xs text-gray-400 block mt-0.5">
                      LA MARSA : RUE DES NARCISSES, LA MARSA
                    </span>
                  </div>
                </li>

                <li className="flex items-center gap-4 text-gray-300">
                  <div className="w-11 h-11 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] shrink-0">
                    <Phone size={20} />
                  </div>
                  <span className="font-semibold tracking-wide">
                    +216 54 804 408 (Menzah) / +216 54 805 508 (Marsa)
                  </span>
                </li>

                <li className="flex items-center gap-4 text-gray-300">
                  <div className="w-11 h-11 rounded-xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] shrink-0">
                    <Mail size={20} />
                  </div>
                  <span className="font-semibold tracking-wide uppercase">
                    CONTACT@LEZINK.TN
                  </span>
                </li>
              </ul>

              {/* Réseaux Sociaux Maquette */}
              <div className="pt-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">
                  SUIVEZ-NOUS
                </span>
                <div className="flex items-center gap-3">
                  <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} href="https://www.instagram.com/lezinktunis" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-[#181820] border border-white/10 flex items-center justify-center text-white hover:bg-[#F59E0B] hover:text-black transition-all shadow-md">
                    <Instagram size={20} />
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} href="https://www.facebook.com/lezinktunis" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-[#181820] border border-white/10 flex items-center justify-center text-white hover:bg-[#F59E0B] hover:text-black transition-all shadow-md">
                    <Facebook size={20} />
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Formulaire "ENVOIE-NOUS UN MESSAGE" */}
            <motion.div 
              whileHover={{ borderColor: 'rgba(245, 158, 11, 0.4)' }}
              className="bg-[#121217] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all"
            >
              <h3 className="font-heading font-bold text-lg text-white uppercase tracking-wider mb-6 border-l-2 border-[#F59E0B] pl-3">
                ENVOIE-NOUS UN MESSAGE
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="NOM *"
                      className="input-dark text-xs uppercase font-semibold py-3.5 w-full bg-[#181820] border border-white/10 rounded-xl px-4 text-white focus:border-[#F59E0B] transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="EMAIL *"
                      className="input-dark text-xs uppercase font-semibold py-3.5 w-full bg-[#181820] border border-white/10 rounded-xl px-4 text-white focus:border-[#F59E0B] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="TON MESSAGE..."
                    className="input-dark text-xs font-semibold py-3.5 resize-none w-full bg-[#181820] border border-white/10 rounded-xl px-4 text-white focus:border-[#F59E0B] transition-all"
                  />
                </div>

                <div className="text-right pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                    className="btn-gold text-xs font-black uppercase px-8 py-3.5 shadow-lg shadow-[#F59E0B]/30"
                  >
                    {loading ? 'ENVOI EN COURS...' : 'ENVOYER'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>

          {/* Colonne Droite : Carte Visuelle & Horaires */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 flex flex-col justify-between"
          >
            {/* Carte de localisation interactive et moderne */}
            <div className="bg-[#121217] border border-white/10 rounded-3xl overflow-hidden shadow-2xl space-y-2">
              
              {/* Carte map Google Maps Interactive avec filtre Dark Mode */}
              <div className="relative h-[380px] sm:h-[420px] bg-[#181820] overflow-hidden group">
                <iframe 
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(locations[activeLocation].query)}&t=&z=16&ie=UTF8&iwloc=&output=embed`} 
                  title={locations[activeLocation].name}
                  className="w-full h-full border-0 transition-opacity duration-500"
                  style={{ filter: 'invert(90%) hue-rotate(180deg) contrast(100%)' }}
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                
                {/* Overlay pour empêcher le défilement accidentel sur desktop */}
                <div className="absolute inset-0 bg-transparent pointer-events-none group-hover:hidden transition-all duration-300"></div>

                {/* Indication visuelle élégante */}
                <div className="absolute top-4 left-4 bg-[#181820]/90 backdrop-blur-md border border-[#F59E0B]/40 px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 pointer-events-none z-10">
                  <MapPin size={16} className="text-[#F59E0B]" />
                  <span className="text-xs font-bold text-white tracking-widest uppercase">
                    {locations[activeLocation].name}
                  </span>
                </div>

                {/* Toggle Boutons Menzah / Marsa */}
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <button 
                    onClick={() => setActiveLocation('menzah')}
                    className={`text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full transition-all shadow-lg ${activeLocation === 'menzah' ? 'bg-[#F59E0B] text-black border-transparent' : 'bg-[#181820]/90 text-white border border-white/20 hover:border-[#F59E0B]/50 backdrop-blur-md'}`}
                  >
                    MENZAH 1
                  </button>
                  <button 
                    onClick={() => setActiveLocation('marsa')}
                    className={`text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full transition-all shadow-lg ${activeLocation === 'marsa' ? 'bg-[#F59E0B] text-black border-transparent' : 'bg-[#181820]/90 text-white border border-white/20 hover:border-[#F59E0B]/50 backdrop-blur-md'}`}
                  >
                    LA MARSA
                  </button>
                </div>
              </div>
            </div>

            {/* Carte des Horaires (Maquette en bas à droite) */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-[#121217] border border-white/10 rounded-3xl p-8 shadow-2xl transition-all"
            >
              <h3 className="font-heading font-bold text-lg text-white uppercase tracking-wider mb-6 border-l-2 border-[#F59E0B] pl-3 flex items-center justify-between">
                <span>HORAIRES D'OUVERTURE</span>
                <Clock size={20} className="text-[#F59E0B]" />
              </h3>

              <ul className="space-y-4 text-sm sm:text-base">
                <li className="flex items-center justify-between py-2 border-b border-white/5 text-gray-300">
                  <span className="font-semibold">Lundi - Dimanche :</span>
                  <span className="text-[#F59E0B] font-bold">12h00 - 23h30</span>
                </li>
                <li className="flex items-center justify-between py-2 text-gray-300">
                  <span className="font-semibold text-xs italic text-gray-400">Ouvert en continu 7j/7</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
