// src/pages/About.jsx
import React from 'react';
import { ChefHat, Utensils, Heart, Award, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen pt-28 pb-24 overflow-hidden">
      <div className="container-custom space-y-20">
        
        {/* --- SECTION HISTOIRE (Écran 03 • À PROPOS) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Colonne Gauche : Texte de l'histoire Le Zink */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center lg:text-left"
          >
            <span className="badge-gold inline-block">★ Pionnier du Burger Gourmet en Tunisie</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight uppercase">
              L'ESPRIT <span className="text-[#F59E0B]">LE ZINK</span>
            </h1>
            
            {/* Sous-titre manuscrit maquette */}
            <h2 className="font-script text-4xl sm:text-5xl text-[#F59E0B] font-bold -mt-2">
              Taste the original depuis 2014.
            </h2>

            <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed pt-2">
              <p>
                Tout a commencé en <strong className="text-white font-semibold">avril 2014 à El Menzah 1</strong>, au 1 Rue Salah Ben Mahmoud à Tunis. L'idée était audacieuse : révolutionner le paysage culinaire tunisien en créant le <strong className="text-white font-semibold">premier véritable steakhouse & burger bar néo-américain</strong> de haute gastronomie.
              </p>
              <p>
                Loin des fast-foods standards, <strong className="text-[#F59E0B] font-semibold">Le Zink</strong> a imposé une exigence absolue : l'utilisation de <strong className="text-white font-semibold">viandes nobles maturées ("On the grill")</strong>, de pains briochés artisanaux pétris et dorés chaque matin, d'ingrédients audacieux (truffe noire, foie gras Rossini, gorgonzola AOP) et bien sûr, de notre iconique <strong className="text-white font-semibold">poutine québécoise</strong>.
              </p>
              <p>
                Aujourd'hui incontournable à <strong className="text-[#F59E0B] font-semibold">El Menzah</strong> et à <strong className="text-[#F59E0B] font-semibold">La Marsa</strong>, Le Zink rassemble les véritables passionnés de goût autour d'une promesse simple : <em className="text-amber-200">Taste the original</em>.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-[#181820] border border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-gray-300 shadow-md">
                <Award size={16} className="text-[#F59E0B]" />
                <span>N°1 des Burgers Gourmets à Tunis</span>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2 bg-[#181820] border border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-gray-300 shadow-md">
                <ShieldCheck size={16} className="text-[#F59E0B]" />
                <span>Viandes Maturées Premium</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Colonne Droite : Image Chef & Sceau Fait Maison */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/50 group">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
                alt="Chef préparant un burger gourmet au Zink"
                className="w-full h-[450px] sm:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Sceau doré officiel rotatif */}
              <motion.div 
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 right-6 bg-[#121217]/95 backdrop-blur-md border-2 border-[#F59E0B] p-5 rounded-full shadow-2xl flex flex-col items-center justify-center text-center w-32 h-32"
              >
                <span className="text-2xl">🇹🇳</span>
                <span className="font-heading font-black text-[10px] text-[#F59E0B] uppercase tracking-widest mt-1">
                  LE ZINK
                </span>
                <span className="text-[8px] text-gray-400 uppercase font-bold">EST. 2014 TUNIS</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* --- 3 COLONNES DE VALEURS (Maquette en bas de page) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#121217] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {/* Valeur 1 : Produits Frais */}
          <motion.div whileHover={{ y: -5 }} className="space-y-4 text-center md:text-left transition-all">
            <div className="w-16 h-16 rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] mx-auto md:mx-0 shadow-inner">
              <ChefHat size={32} />
            </div>
            <h3 className="font-heading font-bold text-xl text-white uppercase tracking-wider">
              PRODUITS FRAIS
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Sourcés chaque matin auprès de producteurs locaux choisis pour leur exigence. Aucune congélation pour nos viandes et légumes.
            </p>
          </motion.div>

          {/* Valeur 2 : Fait Maison */}
          <motion.div whileHover={{ y: -5 }} className="space-y-4 text-center md:text-left md:border-l md:border-white/10 md:pl-10 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] mx-auto md:mx-0 shadow-inner">
              <Utensils size={32} />
            </div>
            <h3 className="font-heading font-bold text-xl text-white uppercase tracking-wider">
              FAIT MAISON
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Nos sauces secrètes, nos frites taillées au couteau, nos marinades et nos desserts. Tout est préparé minute sur place chaque jour.
            </p>
          </motion.div>

          {/* Valeur 3 : Équipe Passionnée */}
          <motion.div whileHover={{ y: -5 }} className="space-y-4 text-center md:text-left md:border-l md:border-white/10 md:pl-10 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B] mx-auto md:mx-0 shadow-inner">
              <Heart size={32} />
            </div>
            <h3 className="font-heading font-bold text-xl text-white uppercase tracking-wider">
              ÉQUIPE PASSIONNÉE
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Des amoureux du goût, de l'accueil chaleureux et du travail bien fait. Le sourire et l'authenticité sont dans notre ADN.
            </p>
          </motion.div>
        </motion.div>

        {/* --- SIGNATURE MANUSCRITE MAQUETTE --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-right pr-6 pt-4"
        >
          <p className="font-script text-4xl sm:text-5xl text-[#F59E0B] font-bold inline-block rotate-[-3deg] drop-shadow-sm">
            Merci & Welcome !
          </p>
          <p className="font-heading font-bold text-sm text-gray-400 uppercase tracking-widest mt-1">
            L'Équipe Le Zink • Taste the original
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
