// src/components/admin/AdminStaff.jsx
import React, { useState } from 'react';
import { ShieldCheck, UserPlus, Lock, Key, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminStaff = ({ staffList, staffPins, onUpdatePin, role }) => {
  const [pinInputs, setPinInputs] = useState({});

  const handlePinChange = (id, val) => {
    setPinInputs(prev => ({ ...prev, [id]: val }));
  };

  const handlePinSubmit = (e, id) => {
    e.preventDefault();
    if (pinInputs[id]) {
      onUpdatePin(id, pinInputs[id]);
      setPinInputs(prev => ({ ...prev, [id]: '' }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 flex items-start gap-4">
        <ShieldCheck className="text-amber-500 shrink-0 mt-0.5" size={24} />
        <div>
          <h3 className="text-amber-500 font-bold uppercase tracking-wider text-sm mb-1">Sécurité & Accès</h3>
          <p className="text-amber-500/80 text-xs">Seul le Gérant (ADMIN) peut modifier les codes PIN d'accès aux différentes interfaces du système. Le code PIN par défaut de l'ADMIN est 2014.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {staffList.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#131318] border border-white/10 rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <h4 className="font-heading font-black text-white text-lg">{member.role}</h4>
                <p className="text-xs text-gray-400 mt-1">{member.name} • {member.phone}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                member.status.includes('En ligne') || member.status.includes('cuisine') || member.status.includes('salle') || member.status.includes('tournée')
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                  : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
              }`}>
                {member.status}
              </span>
            </div>
            
            <div className="bg-[#181820] p-5">
              <div className="flex items-center gap-3 mb-4">
                <Lock size={16} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-300">Code PIN actuel :</span>
                <span className="font-mono bg-black px-3 py-1 rounded border border-white/10 text-amber-500 font-bold tracking-widest">
                  {staffPins[member.id] ? '****' : 'Non défini'}
                </span>
              </div>

              {role === 'ADMIN' && (
                <form onSubmit={(e) => handlePinSubmit(e, member.id)} className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Key size={14} className="absolute left-3 top-3 text-gray-500" />
                    <input
                      type="password"
                      maxLength="4"
                      placeholder="Nouveau code (4 chiffres)"
                      value={pinInputs[member.id] || ''}
                      onChange={(e) => handlePinChange(member.id, e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-[#131318] border border-white/10 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:border-amber-500 outline-none transition-all font-mono"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={!pinInputs[member.id] || pinInputs[member.id].length < 4}
                    className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:hover:bg-amber-500 text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    Mettre à jour
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminStaff;
