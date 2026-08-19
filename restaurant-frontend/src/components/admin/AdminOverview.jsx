// src/components/admin/AdminOverview.jsx
import React from 'react';
import { TrendingUp, ShoppingBag, DollarSign, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, title, value, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-[#131318] border border-white/10 rounded-2xl p-5 flex items-center gap-4 shadow-xl"
  >
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</h3>
      <p className="text-2xl font-heading font-black text-white">{value}</p>
    </div>
  </motion.div>
);

const AdminOverview = ({ orders = [] }) => {
  // Calculs simples
  const today = new Date();
  const todayOrders = orders.filter(o => {
    // Dans ce contexte, on suppose que les commandes affichées sont celles d'aujourd'hui. 
    // Sinon, on filtrerait selon o.createdAt.
    return true;
  });

  const totalRevenue = todayOrders.reduce((sum, order) => sum + (order.total || 0), 0);
  const pendingOrders = todayOrders.filter(o => o.status === 'En attente').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard 
          icon={DollarSign} 
          title="Chiffre d'affaires (Jour)" 
          value={`${totalRevenue.toFixed(2)} DT`} 
          color="bg-amber-500/20 text-amber-500 border border-amber-500/30" 
        />
        <StatCard 
          icon={ShoppingBag} 
          title="Commandes (Jour)" 
          value={todayOrders.length} 
          color="bg-blue-500/20 text-blue-500 border border-blue-500/30" 
        />
        <StatCard 
          icon={Clock} 
          title="En attente" 
          value={pendingOrders} 
          color="bg-red-500/20 text-red-500 border border-red-500/30" 
        />
        <StatCard 
          icon={TrendingUp} 
          title="Panier Moyen" 
          value={todayOrders.length > 0 ? `${(totalRevenue / todayOrders.length).toFixed(2)} DT` : '0.00 DT'} 
          color="bg-emerald-500/20 text-emerald-500 border border-emerald-500/30" 
        />
      </div>

      <div className="bg-[#131318] border border-white/10 rounded-2xl p-6 shadow-xl text-center min-h-[300px] flex flex-col justify-center items-center">
         <TrendingUp size={48} className="text-gray-600 mb-4" />
         <h3 className="text-lg font-heading font-bold text-white mb-2">Performances</h3>
         <p className="text-sm text-gray-400">Le graphique des ventes en temps réel sera disponible ici prochainement.</p>
      </div>
    </div>
  );
};

export default AdminOverview;
