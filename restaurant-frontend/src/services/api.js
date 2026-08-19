// src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- PLATS (DISHES) ---
export const fetchDishes = async (params = {}) => {
  try {
    const response = await api.get('/dishes', { params });
    return response.data;
  } catch (error) {
    console.error('Erreur fetchDishes:', error);
    throw error;
  }
};

export const fetchDishById = async (id) => {
  try {
    const response = await api.get(`/dishes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur fetchDishById (${id}):`, error);
    throw error;
  }
};

// --- COMMANDES (ORDERS) ---
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Erreur createOrder:', error);
    throw error;
  }
};

export const fetchOrderById = async (id) => {
  try {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur fetchOrderById (${id}):`, error);
    throw error;
  }
};

export const updateOrderStatus = async (id, statusData) => {
  try {
    const response = await api.put(`/orders/${id}/status`, statusData);
    return response.data;
  } catch (error) {
    console.error(`Erreur updateOrderStatus (${id}):`, error);
    throw error;
  }
};

// --- AVIS (REVIEWS) ---
export const fetchReviews = async (params = {}) => {
  try {
    const response = await api.get('/reviews', { params });
    return response.data;
  } catch (error) {
    console.error('Erreur fetchReviews:', error);
    throw error;
  }
};

export const createReview = async (reviewData) => {
  try {
    const response = await api.post('/reviews', reviewData);
    return response.data;
  } catch (error) {
    console.error('Erreur createReview:', error);
    throw error;
  }
};

// --- RÉSERVATIONS & CONTACT ---
export const createReservation = async (reservationData) => {
  try {
    const response = await api.post('/reservations', reservationData);
    return response.data;
  } catch (error) {
    console.error('Erreur createReservation:', error);
    throw error;
  }
};

// --- SEEDING (Remplissage DB) ---
export const triggerSeed = async () => {
  try {
    const response = await api.post('/seed');
    return response.data;
  } catch (error) {
    console.error('Erreur triggerSeed:', error);
    throw error;
  }
};

// --- CRUD PLATS (DISHES ADMIN) ---
export const createDishApi = async (dishData, role = 'ADMIN') => {
  try {
    const response = await api.post('/dishes', dishData, {
      headers: { 'x-admin-role': role }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur createDishApi:', error);
    throw error;
  }
};

export const updateDishApi = async (id, dishData, role = 'ADMIN') => {
  try {
    const response = await api.put(`/dishes/${id}`, dishData, {
      headers: { 'x-admin-role': role }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur updateDishApi:', error);
    throw error;
  }
};

export const deleteDishApi = async (id, role = 'ADMIN') => {
  try {
    const response = await api.delete(`/dishes/${id}`, {
      headers: { 'x-admin-role': role }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur deleteDishApi:', error);
    throw error;
  }
};

// --- LISTE DES COMMANDES ADMIN/STAFF ---
export const fetchAllOrders = async (params = {}, role = 'ADMIN') => {
  try {
    const response = await api.get('/orders', {
      params,
      headers: { 'x-admin-role': role }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur fetchAllOrders:', error);
    throw error;
  }
};

// --- GESTION DES CODES PIN DU STAFF ---
export const verifyStaffPin = async (role, pinCode) => {
  try {
    const response = await api.post('/staff/verify-pin', { role, pinCode });
    return response.data;
  } catch (error) {
    console.error('Erreur verifyStaffPin:', error);
    throw error;
  }
};

export const fetchStaffPins = async () => {
  try {
    const response = await api.get('/staff/pins');
    return response.data;
  } catch (error) {
    console.error('Erreur fetchStaffPins:', error);
    throw error;
  }
};

export const updateStaffPin = async (role, newPin) => {
  try {
    const response = await api.put('/staff/pins', { role, newPin });
    return response.data;
  } catch (error) {
    console.error('Erreur updateStaffPin:', error);
    throw error;
  }
};

export default api;
