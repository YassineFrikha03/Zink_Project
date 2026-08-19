// models/Reservation.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    customerName: {
      type: String,
      required: [true, 'Le nom pour la réservation est obligatoire'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'L\'adresse email est obligatoire'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Le numéro de téléphone est obligatoire'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'La date de réservation est obligatoire'],
    },
    time: {
      type: String,
      required: [true, 'L\'heure de réservation est obligatoire'], // ex: "19:30"
    },
    numberOfGuests: {
      type: Number,
      required: [true, 'Le nombre de personnes est obligatoire'],
      min: [1, 'La réservation doit être pour au moins 1 personne'],
      max: [50, 'Veuillez nous contacter directement pour les groupes de plus de 50 personnes'],
    },
    status: {
      type: String,
      enum: ['En attente', 'Confirmée', 'Annulée', 'Terminée'],
      default: 'En attente',
    },
    tableNumber: {
      type: Number, // Attribué par le personnel ou l'administration
    },
    specialRequests: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Reservation', reservationSchema);
