// src/components/admin/AdminOrdersTickets.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Phone, MapPin, Receipt, CheckCircle, Truck, XCircle, ChefHat } from 'lucide-react';

const AdminOrdersTickets = ({ orders, onUpdateStatus, role }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <Receipt size={48} className="mb-4 opacity-50" />
        <p>Aucune commande pour le moment.</p>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'En attente': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'En préparation': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'Prête': return 'bg-purple-500/20 text-purple-500 border-purple-500/30';
      case 'En livraison': return 'bg-teal-500/20 text-teal-500 border-teal-500/30';
      case 'Livrée': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'Annulée': return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {orders.map((order) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white text-black rounded-sm shadow-xl flex flex-col overflow-hidden relative"
          style={{ width: '100%', maxWidth: '380px', margin: '0 auto', border: '1px solid #e5e7eb' }}
        >
          {/* Bordure crantée type ticket en haut */}
          <div className="h-3 w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBhdGggZD0iTTAgMTBMNSAwTDEwIDEwWiIgZmlsbD0iI2Y5ZmFmYiIvPjwvc3ZnPg==')] rotate-180 absolute top-0"></div>

          {/* En-tête Ticket */}
          <div className="pt-6 pb-4 px-6 border-b-2 border-dashed border-gray-300 text-center bg-gray-50">
            <h3 className="font-heading font-black text-xl tracking-widest uppercase mb-1 text-gray-800">TICKET DE CAISSE</h3>
            <p className="text-xs text-gray-500 font-mono">Commande #{order.id.slice(-6).toUpperCase()}</p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gray-200 text-gray-700 border border-gray-300">
                {order.type}
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 flex items-center justify-center gap-1">
              <Clock size={10} /> Il y a {order.timeMinutes} min
            </p>
          </div>

          {/* Info Client */}
          <div className="px-6 py-4 border-b-2 border-dashed border-gray-300 bg-white space-y-2">
            <p className="text-sm font-bold uppercase tracking-wide text-gray-800">{order.customer}</p>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Phone size={14} className="text-gray-400" />
              <span className="font-mono">{order.phone}</span>
            </div>
            {order.type === 'Livraison' && (
              <div className="flex items-start gap-2 text-xs text-gray-600 mt-1">
                <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                <span>{order.zone}</span>
              </div>
            )}
          </div>

          {/* Détail de la commande */}
          <div className="px-6 py-4 flex-1 bg-white">
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="text-sm">
                  <div className="flex items-start justify-between font-medium">
                    <span><span className="text-gray-500 font-mono mr-1">{item.qty}x</span> {item.name}</span>
                    <span>{(item.price * item.qty).toFixed(2)} DT</span>
                  </div>
                  {item.notes && (
                    <p className="text-xs text-gray-500 mt-0.5 ml-5 italic leading-snug">
                      - {item.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="px-6 py-4 border-t-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-between">
            <span className="font-black text-lg uppercase tracking-wide">TOTAL</span>
            <span className="font-black text-xl">{order.total.toFixed(2)} DT</span>
          </div>

          {/* Actions rapides */}
          <div className="p-4 bg-gray-100 flex items-center justify-center gap-2 flex-wrap">
            {order.status === 'En attente' && (role === 'ADMIN' || role === 'CAISSIER' || role === 'CHEF') && (
              <button 
                onClick={() => onUpdateStatus(order.id, 'En préparation')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded shadow-sm transition-colors"
              >
                <ChefHat size={14} /> Préparer
              </button>
            )}
            {order.status === 'En préparation' && (role === 'ADMIN' || role === 'CHEF') && (
              <button 
                onClick={() => onUpdateStatus(order.id, 'Prête')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded shadow-sm transition-colors"
              >
                <CheckCircle size={14} /> Prête
              </button>
            )}
            {order.status === 'Prête' && order.type === 'Livraison' && (role === 'ADMIN' || role === 'LOGISTIQUE') && (
              <button 
                onClick={() => onUpdateStatus(order.id, 'En livraison')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded shadow-sm transition-colors"
              >
                <Truck size={14} /> Expédier
              </button>
            )}
            {(order.status === 'Prête' || order.status === 'En livraison') && (role === 'ADMIN' || role === 'CAISSIER' || role === 'LOGISTIQUE') && (
              <button 
                onClick={() => onUpdateStatus(order.id, 'Livrée')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold rounded shadow-sm transition-colors"
              >
                <CheckCircle size={14} /> Terminée
              </button>
            )}
            {order.status !== 'Livrée' && order.status !== 'Annulée' && (role === 'ADMIN' || role === 'CAISSIER') && (
              <button 
                onClick={() => onUpdateStatus(order.id, 'Annulée')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 text-xs font-bold rounded transition-colors"
              >
                <XCircle size={14} /> Annuler
              </button>
            )}
          </div>

          {/* Bordure crantée type ticket en bas */}
          <div className="h-3 w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBhdGggZD0iTTAgMTBMNSAwTDEwIDEwWiIgZmlsbD0iI2Y5ZmFmYiIvPjwvc3ZnPg==')] absolute bottom-0"></div>
        </motion.div>
      ))}
    </div>
  );
};

export default AdminOrdersTickets;
