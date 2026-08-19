const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Routes pour créer (public) et lister les réservations (staff/admin)
router.route('/')
  .post(reservationController.createReservation)
  .get(protect, authorize('admin', 'employé'), reservationController.getReservations);

// Route pour changer le statut ou assigner un numéro de table (staff/admin)
router.put('/:id/status', protect, authorize('admin', 'employé'), reservationController.updateReservationStatus);

// Routes pour une réservation par ID
router.route('/:id')
  .get(protect, reservationController.getReservationById)
  .delete(protect, authorize('admin'), reservationController.deleteReservation);

module.exports = router;
