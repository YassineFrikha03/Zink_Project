const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Routes pour /api/dishes (Lecture publique, Création réservée au staff)
router.route('/')
  .get(dishController.getAllDishes)
  .post(protect, authorize('admin', 'employé'), dishController.createDish);

// Routes pour /api/dishes/:id (Lecture publique, Modification/Suppression réservées)
router.route('/:id')
  .get(dishController.getDishById)
  .put(protect, authorize('admin', 'employé'), dishController.updateDish)
  .delete(protect, authorize('admin'), dishController.deleteDish);

module.exports = router;
