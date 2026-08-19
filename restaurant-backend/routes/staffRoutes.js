// routes/staffRoutes.js
const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

// Vérification de code PIN
router.post('/verify-pin', staffController.verifyPin);

// Lecture et mise à jour des codes PIN par le gérant
router.route('/pins')
  .get(staffController.getAllPins)
  .put(staffController.updatePin);

module.exports = router;
