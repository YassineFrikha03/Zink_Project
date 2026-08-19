// src/components/admin/AdminMenu.jsx
import React, { useState } from 'react';
import { Plus, Edit3, Trash2, CheckCircle, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminMenu = ({ dishes, onAddDish, onUpdateDish, onDeleteDish }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('TOUS');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [dishForm, setDishForm] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Signatures',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    prepTime: '12 min',
    isAvailable: true
  });

  const categories = ['TOUS', 'Signatures', 'Classiques', 'Accompagnements', 'Boissons', 'Desserts'];

  const filteredDishes = dishes.filter(dish => {
    const matchCat = selectedCategory === 'TOUS' || dish.category === selectedCategory;
    const matchSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOpenModal = (dish = null) => {
    if (dish) {
      setEditingDish(dish);
      setDishForm({
        name: dish.name,
        price: dish.price,
        description: dish.description,
        category: dish.category,
        image: dish.image,
        prepTime: dish.prepTime || '10 min',
        isAvailable: dish.isAvailable
      });
    } else {
      setEditingDish(null);
      setDishForm({
        name: '', price: '', description: '', category: 'Signatures',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
        prepTime: '12 min', isAvailable: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingDish) {
      onUpdateDish(editingDish._id, dishForm);
    } else {
      onAddDish(dishForm);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#131318] p-4 rounded-2xl border border-white/10 shadow-xl">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#F59E0B] text-black shadow-lg shadow-[#F59E0B]/20'
                  : 'bg-[#181820] text-gray-400 border border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Rechercher un plat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-dark bg-[#181820] border border-white/10 text-white px-4 py-2 rounded-xl text-sm w-full focus:border-[#F59E0B] outline-none"
          />
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-[#F59E0B] text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap shadow-lg shadow-[#F59E0B]/20 hover:bg-[#FBBF24]"
          >
            <Plus size={16} /> Ajouter
          </button>
        </div>
      </div>

      {/* Liste des Plats */}
      <div className="bg-[#131318] rounded-2xl border border-white/10 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#181820] text-xs uppercase font-heading text-gray-500 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Plat</th>
                <th className="px-6 py-4">Catégorie</th>
                <th className="px-6 py-4">Prix</th>
                <th className="px-6 py-4">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredDishes.map((dish) => (
                <tr key={dish._id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img src={dish.image} alt={dish.name} className="w-12 h-12 rounded-lg object-cover bg-black" />
                    <div>
                      <p className="font-bold text-white text-base">{dish.name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-xs">{dish.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-gray-300">
                      {dish.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-heading font-bold text-[#F59E0B]">
                    {dish.price?.toFixed(2)} DT
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onUpdateDish(dish._id, { ...dish, isAvailable: !dish.isAvailable })}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors ${
                        dish.isAvailable
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20'
                          : 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20'
                      }`}
                    >
                      {dish.isAvailable ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
                      {dish.isAvailable ? 'En stock' : 'Rupture'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(dish)}
                        className="p-2 bg-white/5 hover:bg-[#F59E0B]/20 text-gray-400 hover:text-[#F59E0B] rounded-xl transition-colors"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => onDeleteDish(dish._id)}
                        className="p-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-500 rounded-xl transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Edition / Création */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#121217] border border-white/10 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl"
            >
              <div className="bg-[#181820] px-6 py-4 border-b border-white/10 flex justify-between items-center">
                <h3 className="font-heading font-black text-xl text-white uppercase tracking-wider">
                  {editingDish ? 'Modifier le plat' : 'Nouveau plat'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Nom du plat</label>
                    <input required type="text" value={dishForm.name} onChange={(e) => setDishForm({...dishForm, name: e.target.value})} className="w-full bg-[#181820] border border-white/10 rounded-xl p-3 text-white text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Prix (DT)</label>
                    <input required type="number" step="0.1" value={dishForm.price} onChange={(e) => setDishForm({...dishForm, price: Number(e.target.value)})} className="w-full bg-[#181820] border border-white/10 rounded-xl p-3 text-white text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Catégorie</label>
                    <select value={dishForm.category} onChange={(e) => setDishForm({...dishForm, category: e.target.value})} className="w-full bg-[#181820] border border-white/10 rounded-xl p-3 text-white text-sm">
                      {categories.filter(c => c !== 'TOUS').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">URL Image</label>
                    <input required type="url" value={dishForm.image} onChange={(e) => setDishForm({...dishForm, image: e.target.value})} className="w-full bg-[#181820] border border-white/10 rounded-xl p-3 text-white text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Description</label>
                  <textarea required rows="3" value={dishForm.description} onChange={(e) => setDishForm({...dishForm, description: e.target.value})} className="w-full bg-[#181820] border border-white/10 rounded-xl p-3 text-white text-sm resize-none"></textarea>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm font-bold uppercase hover:bg-white/5">Annuler</button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-[#F59E0B] text-black text-sm font-bold uppercase shadow-lg shadow-[#F59E0B]/20">{editingDish ? 'Mettre à jour' : 'Créer le plat'}</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminMenu;
