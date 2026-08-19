// models/Dish.js
const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Le nom du plat est obligatoire'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'La description est obligatoire'],
    },
    price: {
      type: Number,
      required: [true, 'Le prix est obligatoire'],
      min: [0, 'Le prix ne peut pas être négatif'],
    },
    category: {
      type: String,
      required: [true, 'La catégorie est obligatoire'],
      enum: {
        values: [
          'Signatures',
          'Classiques',
          'Poulet',
          'Végétariens',
          'Accompagnements',
          'Boissons',
          'Desserts',
          'Burger',
          'Menu',
          'Accompagnement',
          'Boisson',
          'Dessert',
          'Sauce',
          'Entrée',
          'Plat',
        ],
        message: '{VALUE} nest pas une catégorie valide',
      },
    },
    subcategory: {
      type: String,
      trim: true,
    },
    isSignature: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: 'default-dish.jpg',
    },
    ingredients: [
      {
        type: String,
        trim: true,
      },
    ],
    allergens: [
      {
        type: String,
        trim: true,
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    isVegetarian: {
      type: Boolean,
      default: false,
    },
    preparationTime: {
      type: Number, // en minutes
      default: 15,
    },
    customizations: [
      {
        name: { type: String, required: true }, // ex: "Choix de cuisson", "Suppléments"
        options: [
          {
            name: { type: String, required: true }, // ex: "À point", "Cheddar supplémentaire"
            extraPrice: { type: Number, default: 0 },
          },
        ],
      },
    ],
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Dish', dishSchema);