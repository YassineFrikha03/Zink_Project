// src/components/CheckoutModal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle, MapPin, Phone, Mail, User, CreditCard, Banknote, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';
import toast from 'react-hot-toast';

const CheckoutModal = () => {
  const { cart, isCheckoutOpen, setIsCheckoutOpen, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: 'Yassine',
    email: 'yassine@burgerhouse.fr',
    phone: '06 12 34 56 78',
    address: '23 Rue des Saveurs, 75011 Paris',
    orderType: 'Livraison',
    paymentMethod: 'Carte',
    notes: 'Sans oignons dans le burger classique svp !',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);
    try {
      const itemsPayload = cart.map((item) => ({
        dish: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        selectedOptions: item.selectedOptions || [],
      }));

      const finalTotal = formData.orderType === 'Livraison' ? totalAmount + 2.50 : totalAmount;

      const payload = {
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.orderType === 'Livraison' ? formData.address : 'À emporter / Sur place',
        },
        items: itemsPayload,
        totalAmount: finalTotal,
        orderType: formData.orderType,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
      };

      const response = await createOrder(payload);
      
      toast.success('Commande validée avec succès !', {
        duration: 3000,
        icon: '🎉',
      });

      clearCart();
      setIsCheckoutOpen(false);

      const orderId = response.data ? response.data._id : 'BH-2026-1578';
      navigate(`/suivi/${orderId}`);
    } catch (error) {
      console.error('Erreur lors de la commande:', error);
      toast.error('Erreur lors de l\'enregistrement de la commande. Vérifiez le serveur backend.');
    } finally {
      setLoading(false);
    }
  };

  const finalPrice = formData.orderType === 'Livraison' ? totalAmount + 2.50 : totalAmount;

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-[#121217] border border-white/10 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-[#181820] px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-black text-xl text-white">FINALISER MA COMMANDE</h3>
                <p className="text-xs text-gray-400">Paiement sécurisé et préparation minute</p>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-2 text-gray-400 hover:text-white rounded-full bg-white/5 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              
              {/* Choix du type de commande */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Type de commande
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Sur place', 'À emporter', 'Livraison'].map((type) => (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      key={type}
                      onClick={() => setFormData((prev) => ({ ...prev, orderType: type }))}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-heading font-bold uppercase tracking-wider transition-all ${
                        formData.orderType === type
                          ? 'bg-[#F59E0B] border-[#F59E0B] text-black shadow-lg shadow-[#F59E0B]/20'
                          : 'bg-[#181820] border-white/10 text-gray-300 hover:border-white/30'
                      }`}
                    >
                      {type}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Coordonnées Client */}
              <div className="space-y-4">
                <h4 className="font-heading font-bold text-sm text-white border-l-2 border-[#F59E0B] pl-2 uppercase">
                  1. Mes Coordonnées
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Nom complet *</label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-3.5 text-gray-500" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="input-dark pl-10 text-sm w-full bg-[#181820] border border-white/10 rounded-xl py-3 text-white focus:border-[#F59E0B] transition-all"
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Téléphone *</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3.5 top-3.5 text-gray-500" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-dark pl-10 text-sm w-full bg-[#181820] border border-white/10 rounded-xl py-3 text-white focus:border-[#F59E0B] transition-all"
                        placeholder="06 00 00 00 00"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Adresse Email *</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-3.5 text-gray-500" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input-dark pl-10 text-sm w-full bg-[#181820] border border-white/10 rounded-xl py-3 text-white focus:border-[#F59E0B] transition-all"
                      placeholder="exemple@email.com"
                    />
                  </div>
                </div>

                {formData.orderType === 'Livraison' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                    <label className="block text-xs text-gray-400 mb-1">Adresse de livraison *</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3.5 top-3.5 text-gray-500" />
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="input-dark pl-10 text-sm w-full bg-[#181820] border border-white/10 rounded-xl py-3 text-white focus:border-[#F59E0B] transition-all"
                        placeholder="Numéro, rue, code postal et ville"
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Mode de paiement */}
              <div className="space-y-3">
                <h4 className="font-heading font-bold text-sm text-white border-l-2 border-[#F59E0B] pl-2 uppercase">
                  2. Mode de paiement
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'Carte', label: 'Carte bancaire', icon: CreditCard },
                    { id: 'Espèces', label: 'Espèces à la livraison', icon: Banknote },
                  ].map((method) => {
                    const Icon = method.icon;
                    return (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        key={method.id}
                        onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: method.id }))}
                        className={`p-3 rounded-xl border flex items-center gap-3 text-sm font-semibold transition-all ${
                          formData.paymentMethod === method.id
                            ? 'bg-amber-500/15 border-[#F59E0B] text-white shadow-md shadow-[#F59E0B]/10'
                            : 'bg-[#181820] border-white/10 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        <Icon size={18} className={formData.paymentMethod === method.id ? 'text-[#F59E0B]' : 'text-gray-500'} />
                        {method.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Notes spéciales */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">Instructions / Allergies (Optionnel)</label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleChange}
                  className="input-dark text-sm resize-none w-full bg-[#181820] border border-white/10 rounded-xl p-3 text-white focus:border-[#F59E0B] transition-all"
                  placeholder="Ex: Sans cornichons, code interphone 1234..."
                />
              </div>

              {/* Récapitulatif Total */}
              <div className="bg-[#181820] p-4 rounded-xl border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <ShieldCheck size={18} className="text-[#F59E0B]" />
                  <span>Paiement 100% sécurisé</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block">Montant à régler :</span>
                  <span className="font-heading font-black text-2xl text-[#F59E0B]">
                    {finalPrice.toFixed(2).replace('.', ',')} DT
                  </span>
                </div>
              </div>

              {/* Bouton de confirmation */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="btn-gold w-full py-4 text-base font-black tracking-wider uppercase shadow-xl shadow-[#F59E0B]/30 disabled:opacity-50"
              >
                {loading ? 'VALIDATION EN COURS...' : `CONFIRMER LA COMMANDE (${finalPrice.toFixed(2).replace('.', ',')} DT)`}
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutModal;
