// controllers/reviewController.js
const Review = require('../models/Review');

// @desc    Créer un nouvel avis
// @route   POST /api/reviews
// @access  Public / Private
exports.createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Merci ! Votre avis a été publié avec succès',
      data: review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de l\'enregistrement de l\'avis',
      error: error.message,
    });
  }
};

// @desc    Récupérer les avis (généraux ou pour un plat précis)
// @route   GET /api/reviews ou GET /api/reviews/dish/:dishId
// @access  Public
exports.getReviews = async (req, res) => {
  try {
    const { dishId } = req.params;
    let query = { status: 'Approuvé' }; // N'afficher que les avis approuvés au public

    if (dishId) {
      query.dish = dishId;
    } else if (req.query.dish) {
      query.dish = req.query.dish;
    }

    // Permettre à l'admin de voir aussi les avis en attente ou rejetés
    if (req.query.status) {
      query.status = req.query.status;
    }

    const reviews = await Review.find(query)
      .populate('user', 'name')
      .populate('dish', 'name image')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des avis',
      error: error.message,
    });
  }
};

// @desc    Supprimer un avis (Modération)
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Avis non trouvé',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Avis supprimé avec succès',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de l\'avis',
      error: error.message,
    });
  }
};
