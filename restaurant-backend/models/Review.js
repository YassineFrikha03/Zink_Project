// models/Review.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    customerName: {
      type: String,
      required: [true, 'Votre nom est obligatoire pour laisser un avis'],
      trim: true,
    },
    dish: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dish',
      required: false, // Optionnel : peut être un avis sur un plat précis ou sur le restaurant en général
    },
    rating: {
      type: Number,
      required: [true, 'La note est obligatoire'],
      min: [1, 'La note minimum est 1'],
      max: [5, 'La note maximum est 5'],
    },
    comment: {
      type: String,
      required: [true, 'Le commentaire est obligatoire'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['En attente', 'Approuvé', 'Rejeté'],
      default: 'Approuvé', // Approuvé par défaut pour affichage direct, ou 'En attente' pour modération
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Review', reviewSchema);
