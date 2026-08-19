// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ChefHat, 
  Receipt, 
  LayoutGrid,
  Users, 
  LogOut, 
  Clock,
  Menu as MenuIcon
} from 'lucide-react';
import toast from 'react-hot-toast';

import AdminOverview from '../components/admin/AdminOverview';
import AdminOrdersTickets from '../components/admin/AdminOrdersTickets';
import AdminMenu from '../components/admin/AdminMenu';
import AdminStaff from '../components/admin/AdminStaff';

import { 
  fetchDishes, 
  createDishApi, 
  updateDishApi, 
  deleteDishApi, 
  fetchAllOrders, 
  updateOrderStatus, 
  fetchStaffPins, 
  updateStaffPin 
} from '../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState(localStorage.getItem('zink_admin_role') || 'ADMIN');
  const [activeTab, setActiveTab] = useState('overview');
  
  // Data State
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [staffPins, setStaffPins] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Horloge
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  // RBAC
  const rolePermissions = {
    ADMIN: {
      title: '👑 Gérant',
      allowedTabs: ['overview', 'orders', 'menu', 'staff']
    },
    CHEF: {
      title: '👨‍🍳 Chef de Cuisine',
      allowedTabs: ['orders', 'menu']
    },
    CAISSIER: {
      title: '📋 Serveur / Caisse',
      allowedTabs: ['orders']
    },
    LOGISTIQUE: {
      title: '🚚 Livraison',
      allowedTabs: ['orders']
    }
  };

  const currentRoleConfig = rolePermissions[activeRole] || rolePermissions.ADMIN;

  useEffect(() => {
    if (!currentRoleConfig.allowedTabs.includes(activeTab)) {
      setActiveTab(currentRoleConfig.allowedTabs[0]);
    }
  }, [activeRole]);

  // Fetch Data
  const loadData = async () => {
    setLoading(true);
    try {
      // Load Orders
      const resOrders = await fetchAllOrders();
      if (resOrders && resOrders.data) {
        const mappedOrders = resOrders.data.map(o => ({
          id: o._id,
          customer: o.customerInfo?.name || 'Client Inconnu',
          phone: o.customerInfo?.phone || '-',
          type: o.orderType || 'Sur place',
          zone: o.customerInfo?.address || 'Non spécifié',
          items: o.items.map(item => ({
            name: item.name,
            qty: item.quantity,
            price: item.price,
            notes: item.selectedOptions?.join(', ') || ''
          })),
          total: o.totalAmount || 0,
          status: o.status || 'En attente',
          timeMinutes: Math.floor((new Date() - new Date(o.createdAt)) / 60000),
          createdAt: o.createdAt
        }));
        setOrders(mappedOrders.reverse());
      }

      // Load Dishes
      const resDishes = await fetchDishes();
      if (resDishes && resDishes.data) {
        setDishes(resDishes.data);
      }

      // Load Pins
      const resPins = await fetchStaffPins();
      if (resPins && resPins.data) {
        setStaffPins(resPins.data);
      } else {
        setStaffPins(JSON.parse(localStorage.getItem('zink_staff_pins') || '{"ADMIN":"2014"}'));
      }
    } catch (error) {
      console.warn("API indisponible, chargement des données de secours.");
      setStaffPins(JSON.parse(localStorage.getItem('zink_staff_pins') || '{"ADMIN":"2014"}'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 30000); // Refresh auto toutes les 30s
    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, { status: newStatus });
      toast.success(`Commande passée en : ${newStatus}`);
      loadData();
    } catch (err) {
      toast.error("Erreur lors de la mise à jour du statut.");
    }
  };

  const handleAddDish = async (dishForm) => {
    try {
      await createDishApi(dishForm, activeRole);
      toast.success("Plat créé avec succès");
      loadData();
    } catch (err) {
      toast.error("Erreur lors de la création.");
    }
  };

  const handleUpdateDish = async (id, dishForm) => {
    try {
      await updateDishApi(id, dishForm, activeRole);
      toast.success("Plat mis à jour");
      loadData();
    } catch (err) {
      toast.error("Erreur lors de la mise à jour.");
    }
  };

  const handleDeleteDish = async (id) => {
    if(window.confirm("Êtes-vous sûr de vouloir supprimer ce plat ?")) {
      try {
        await deleteDishApi(id, activeRole);
        toast.success("Plat supprimé");
        loadData();
      } catch (err) {
        toast.error("Erreur lors de la suppression.");
      }
    }
  };

  const handleUpdatePin = async (roleId, newPinCode) => {
    try {
      await updateStaffPin(roleId, newPinCode);
      const updatedPins = { ...staffPins, [roleId]: newPinCode };
      setStaffPins(updatedPins);
      localStorage.setItem('zink_staff_pins', JSON.stringify(updatedPins));
      toast.success(`PIN pour ${roleId} mis à jour.`);
    } catch (err) {
      toast.error("Erreur mise à jour PIN.");
    }
  };

  const staffListRaw = [
    { id: 'ADMIN', name: 'Yassine Gharbi', role: '👑 Gérant', phone: '+216 98 000 111', status: 'En ligne' },
    { id: 'CHEF', name: 'Hichem Ben Kahloun', role: '👨‍🍳 Chef de Cuisine', phone: '+216 55 220 330', status: 'En cuisine' },
    { id: 'CAISSIER', name: 'Anis Dridi', role: '📋 Serveur / Caisse', phone: '+216 22 440 550', status: 'En salle' },
    { id: 'LOGISTIQUE', name: 'Sami Louati', role: '🚚 Livraison', phone: '+216 54 804 408', status: 'En tournée' }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#131318] border-r border-white/10 flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-white/10 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-[#F59E0B] rounded-2xl flex items-center justify-center shadow-lg shadow-[#F59E0B]/20 mb-3">
            <span className="font-heading font-black text-2xl text-black">ZINK</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#F59E0B]">OS ADMIN</span>
          <span className="text-[10px] text-gray-500 mt-1">{currentRoleConfig.title}</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {currentRoleConfig.allowedTabs.includes('overview') && (
            <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'overview' ? 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <LayoutGrid size={18} /> Vue d'ensemble
            </button>
          )}
          {currentRoleConfig.allowedTabs.includes('orders') && (
            <button onClick={() => setActiveTab('orders')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'orders' ? 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <Receipt size={18} /> Commandes / Tickets
            </button>
          )}
          {currentRoleConfig.allowedTabs.includes('menu') && (
            <button onClick={() => setActiveTab('menu')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'menu' ? 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <MenuIcon size={18} /> Menu & Stocks
            </button>
          )}
          {currentRoleConfig.allowedTabs.includes('staff') && (
            <button onClick={() => setActiveTab('staff')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'staff' ? 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <Users size={18} /> Équipe & Sécurité
            </button>
          )}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={() => {
            localStorage.removeItem('zink_admin_token');
            navigate('/admin-login');
          }} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl text-xs font-bold uppercase transition-colors">
            <LogOut size={16} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-[#131318] border-b border-white/10 px-8 flex items-center justify-between shrink-0">
          <div>
            <h1 className="font-heading font-black text-2xl uppercase tracking-wider text-white flex items-center gap-3">
              {activeTab === 'overview' && 'VUE D\'ENSEMBLE'}
              {activeTab === 'orders' && 'COMMANDES RÉELLES'}
              {activeTab === 'menu' && 'GESTION DU MENU'}
              {activeTab === 'staff' && 'ÉQUIPE & SÉCURITÉ'}
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[#F59E0B] bg-[#F59E0B]/10 px-4 py-2 rounded-xl border border-[#F59E0B]/20">
              <Clock size={16} />
              <span className="font-mono font-bold tracking-widest">{currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#181820] border border-white/10 flex items-center justify-center">
                <ShieldCheck size={20} className="text-[#F59E0B]" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-bold text-white">{currentRoleConfig.title}</p>
                <p className="text-[10px] text-green-400">Connecté • Service Actif</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="w-12 h-12 border-4 border-[#F59E0B]/30 border-t-[#F59E0B] rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {activeTab === 'overview' && <AdminOverview orders={orders} />}
              {activeTab === 'orders' && <AdminOrdersTickets orders={orders} onUpdateStatus={handleUpdateOrderStatus} role={activeRole} />}
              {activeTab === 'menu' && <AdminMenu dishes={dishes} onAddDish={handleAddDish} onUpdateDish={handleUpdateDish} onDeleteDish={handleDeleteDish} />}
              {activeTab === 'staff' && <AdminStaff staffList={staffListRaw} staffPins={staffPins} onUpdatePin={handleUpdatePin} role={activeRole} />}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;