// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ChefHat, 
  Receipt, 
  Truck, 
  Lock, 
  KeyRound, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  HelpCircle,
  Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { verifyStaffPin } from '../services/api';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('ADMIN');
  const [pinCode, setPinCode] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const roles = [
    {
      id: 'ADMIN',
      title: 'Gérant / Super Admin',
      subtitle: 'Contrôle total du restaurant, KPIs, Menu & Offres',
      icon: ShieldCheck,
      color: 'from-amber-500 to-yellow-600',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      defaultPin: '2014',
      permissions: [
        'Chiffre d\'affaires & Statistiques financières (DT)',
        'Gestion complète du Menu (Ajout, Modification, Prix)',
        'Gestion des ruptures de stock & Disponibilité',
        'Création de codes promo & alertes site en direct',
        'Gestion du personnel & des rôles'
      ]
    },
    {
      id: 'CHEF',
      title: 'Chef de Cuisine (KDS)',
      subtitle: 'Écran cuisine tactile, suivi des cuissons et temps',
      icon: ChefHat,
      color: 'from-orange-500 to-red-600',
      badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      defaultPin: '1234',
      permissions: [
        'Écran Kitchen Display System (KDS) en direct',
        'Chronomètre et alertes par commande (Saignant, À point)',
        'Changement de statut (En cuisine -> Prêt à servir)',
        'Mise en rupture immédiate d\'ingrédients'
      ]
    },
    {
      id: 'CAISSIER',
      title: 'Serveur / Caisse POS',
      subtitle: 'Prise de commande tactile au comptoir ou téléphone',
      icon: Receipt,
      color: 'from-blue-500 to-indigo-600',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      defaultPin: '0000',
      permissions: [
        'Terminal de caisse tactile (POS en 1 clic)',
        'Encaissement rapide (Espèces, Carte, TPE)',
        'Génération de tickets de caisse virtuels',
        'Gestion des tables et réservations'
      ]
    },
    {
      id: 'LOGISTIQUE',
      title: 'Responsable Livraison',
      subtitle: 'Dispatching GPS, livreurs El Menzah & La Marsa',
      icon: Truck,
      color: 'from-emerald-500 to-teal-600',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      defaultPin: '9999',
      permissions: [
        'Assignation des livreurs sur carte & zones',
        'Suivi des expéditions en temps réel',
        'Notification client du statut de livraison',
        'Gestion des temps de trajet'
      ]
    }
  ];

  const currentRoleInfo = roles.find(r => r.id === selectedRole);

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!pinCode || pinCode.trim() === '') {
      toast.error('Veuillez saisir votre code PIN secret à 4 chiffres.');
      return;
    }

    setIsAuthenticating(true);
    try {
      // 1. Vérifier le code PIN via l'API backend
      let isValid = false;
      try {
        const res = await verifyStaffPin(selectedRole, pinCode);
        if (res && res.success) {
          isValid = true;
        }
      } catch (apiError) {
        // Fallback local en cas de panne réseau
        console.warn("API indisponible, vérification locale fallback");
        const storedPins = JSON.parse(localStorage.getItem('zink_staff_pins') || '{}');
        const expectedPin = storedPins[selectedRole] || currentRoleInfo.defaultPin;
        if (pinCode.trim() === expectedPin.toString().trim()) {
          isValid = true;
        }
      }

      if (!isValid) {
        toast.error(`❌ Code PIN incorrect pour le rôle "${currentRoleInfo.title}". Accès refusé.`);
        setPinCode('');
        setIsAuthenticating(false);
        return;
      }

      // 2. Enregistrer la session vérifiée en toute sécurité
      localStorage.setItem('zink_admin_role', selectedRole);
      localStorage.setItem('zink_admin_logged', 'true');
      localStorage.setItem('zink_admin_user', currentRoleInfo.title);
      
      toast.success(`Authentification réussie ! Bienvenue, ${currentRoleInfo.title} 🔐`, {
        icon: '👑',
        duration: 3500,
        style: {
          background: '#1F1F27',
          color: '#F59E0B',
          border: '1px solid rgba(245, 158, 11, 0.3)'
        }
      });
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error('Erreur lors de la vérification du code PIN.');
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0E] flex flex-col justify-between py-10 px-4 sm:px-6 relative overflow-hidden selection:bg-[#F59E0B] selection:text-black">
      {/* Effets de lumière en arrière-plan */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F59E0B]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-red-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Header Portail */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F59E0B] to-yellow-600 flex items-center justify-center font-black text-black text-xl shadow-lg shadow-[#F59E0B]/20">
            Z
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
              LE ZINK TUNISIE <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">PORTAIL STAFF</span>
            </h1>
            <p className="text-xs text-gray-400">Accès réservé au personnel — El Menzah 1 & La Marsa</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-sm font-medium border border-white/10 transition-all"
        >
          <Home className="w-4 h-4 text-[#F59E0B]" />
          <span>Retour au site public</span>
        </button>
      </div>

      {/* Contenu de Connexion Admin */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-8 z-10">
        
        {/* Colonne gauche : Choix du rôle (RBAC) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Système RBAC Multi-Rôles Authentique</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Sélectionnez votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-yellow-400">Poste & Rôle</span>
            </h2>
            <p className="text-sm text-gray-400 max-w-xl">
              Chaque membre de l'équipe accède à une interface sur-mesure adaptée à ses fonctions exactes dans les restaurants Le Zink en Tunisie.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;
              return (
                <motion.div
                  key={role.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedRole(role.id);
                    setPinCode(role.defaultPin);
                  }}
                  className={`relative p-5 rounded-2xl cursor-pointer border transition-all duration-300 overflow-hidden ${
                    isSelected
                      ? 'bg-[#181820]/90 border-[#F59E0B] shadow-xl shadow-[#F59E0B]/10'
                      : 'bg-[#13131A]/70 border-white/10 hover:border-white/20 hover:bg-[#181820]/50'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#F59E0B]/20 to-transparent rounded-bl-full pointer-events-none" />
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center shadow-lg text-white font-bold`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${role.badgeColor}`}>
                      {role.id}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-white mb-1 flex items-center gap-1.5">
                    {role.title}
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-[#F59E0B]" />}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {role.subtitle}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-gray-400">Vérification de sécurité :</span>
                    <span className={isSelected ? 'text-[#F59E0B] font-bold flex items-center gap-1' : 'text-gray-500'}>
                      {isSelected ? '👉 PIN requis ci-contre' : 'Cliquez pour sélectionner'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Colonne droite : Formulaire d'authentification PIN / Connexion */}
        <div className="lg:col-span-5">
          <motion.div 
            key={selectedRole}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 sm:p-8 rounded-3xl bg-[#14141C] border border-white/15 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center gap-3 pb-6 border-b border-white/10 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider">Authentification staff</span>
                <h3 className="font-bold text-lg text-white">{currentRoleInfo.title}</h3>
              </div>
            </div>

            {/* Liste des permissions accordées */}
            <div className="mb-6 space-y-2.5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Capacités & Contrôles déverrouillés :
              </p>
              {currentRoleInfo.permissions.map((perm, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0" />
                  <span>{perm}</span>
                </div>
              ))}
            </div>

            {/* Formulaire PIN */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>Code PIN de sécurité (4 chiffres)</span>
                  </label>
                  <span className="text-[11px] font-mono text-[#F59E0B]/80 bg-[#F59E0B]/10 px-2 py-0.5 rounded border border-[#F59E0B]/20">
                    PIN Démo : {currentRoleInfo.defaultPin}
                  </span>
                </div>
                <input
                  type="password"
                  maxLength={6}
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  placeholder="••••"
                  className="w-full bg-[#0D0D12] border border-white/15 focus:border-[#F59E0B] rounded-2xl px-4 py-3.5 text-center text-2xl font-mono tracking-[0.5em] text-white focus:outline-none transition-all placeholder:tracking-normal placeholder:text-gray-600 placeholder:text-base"
                />
              </div>

              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-yellow-500 hover:from-yellow-500 hover:to-[#F59E0B] text-black font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-[#F59E0B]/25 hover:shadow-[#F59E0B]/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isAuthenticating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Ouverture du Dashboard...</span>
                  </>
                ) : (
                  <>
                    <span>Ouvrir le Dashboard ({currentRoleInfo.id})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-white/10 flex items-start gap-2.5 text-[11px] text-gray-400 leading-normal">
              <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
              <span>
                <strong>Note d'architecture :</strong> Conformément aux meilleures pratiques d'un site vitrine & commande de restaurant, aucune page de connexion ou d'inscription n'est visible pour le grand public. Ce portail est accessible par le raccourci secret ou l'URL <code className="text-white bg-white/10 px-1 rounded">/admin</code>.
              </span>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Footer portail */}
      <div className="max-w-6xl mx-auto w-full text-center text-xs text-gray-500 border-t border-white/5 pt-6 z-10">
        <p>Le Zink Tunisie ® 2026 — Système de gestion de restaurant haut de gamme avec contrôle RBAC en temps réel.</p>
      </div>
    </div>
  );
};

export default AdminLogin;
