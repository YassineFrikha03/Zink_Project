const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Routes pour publier un avis et récupérer tous les avis (Public)
router.route('/')
  .post(reviewController.createReview)
  .get(reviewController.getReviews);

// Route pour filtrer les avis d'un plat spécifique (Public)
router.get('/dish/:dishId', reviewController.getReviews);

// Route pour supprimer un avis (Modération admin uniquement)
router.route('/:id')
  .delete(protect, authorize('admin'), reviewController.deleteReview);

module.exports = router;
