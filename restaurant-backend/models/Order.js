// models/Order.js
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  dish: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dish',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'La quantité minimum est 1'],
  },
  price: {
    type: Number,
    required: true,
  },
  selectedOptions: [
    {
      type: String, // ex: "Cuisson: À point", "Supplément: Cheddar (+1.5€)"
    },
  ],
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // Permet les commandes sans compte (invité)
    },
    customerInfo: {
      name: { type: String, required: [true, 'Le nom du client est obligatoire'] },
      email: { type: String, required: [true, 'L\'email du client est obligatoire'] },
      phone: { type: String, required: [true, 'Le téléphone est obligatoire'] },
      address: { type: String }, // Requis surtout si livraison
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    orderType: {
      type: String,
      required: true,
      enum: ['Sur place', 'À emporter', 'Livraison'],
      default: 'À emporter',
    },
    status: {
      type: String,
      required: true,
      enum: ['En attente', 'En préparation', 'Prête', 'En livraison', 'Livrée', 'Annulée'],
      default: 'En attente',
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['Carte', 'Espèces', 'En ligne'],
      default: 'Carte',
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['En attente', 'Payé', 'Échoué'],
      default: 'En attente',
    },
    notes: {
      type: String,
      trim: true, // Instructions spéciales pour la cuisine ou le livreur
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
