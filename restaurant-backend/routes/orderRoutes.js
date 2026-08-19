const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Routes pour la création (publique ou client) et la liste générale (staff/admin)
router.route('/')
  .post(orderController.createOrder)
  .get(protect, authorize('admin', 'employé'), orderController.getOrders);

// Route pour obtenir les commandes d'un client connecté
router.get('/user/:userId', protect, orderController.getUserOrders);

// Route pour mettre à jour le statut (Cuisine -> Prête -> Livraison)
router.put('/:id/status', protect, authorize('admin', 'employé', 'livreur'), orderController.updateOrderStatus);

// Routes pour une commande spécifique par ID
router.route('/:id')
  .get(protect, orderController.getOrderById)
  .delete(protect, authorize('admin'), orderController.deleteOrder);

module.exports = router;
