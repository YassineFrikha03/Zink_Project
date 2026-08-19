const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Routes d'authentification et d'inscription (Publiques)
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Route pour obtenir le profil de l'utilisateur connecté (Client ou Admin)
router.get('/me', protect, userController.getMe);

// Route pour la gestion de tous les utilisateurs (Réservée à l'Admin)
router.route('/')
  .get(protect, authorize('admin'), userController.getUsers);

// Routes pour un utilisateur spécifique
router.route('/:id')
  .get(protect, userController.getUserById)
  .put(protect, userController.updateUser)
  .delete(protect, authorize('admin'), userController.deleteUser);

module.exports = router;
