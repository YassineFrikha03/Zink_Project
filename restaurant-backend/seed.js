// seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Dish = require('./models/Dish');

dotenv.config();

const dishesData = [
  {
    name: 'Le Tornado Burger',
    price: 41.90,
    description: 'Double steak haché pur bœuf, filet de bœuf, cheddar fondant, chorizo ou bacon croustillant, poivron grillé et sauce pesto.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    category: 'Signatures',
    preparationTime: 15,
    tags: ['#FiletDeBoeuf', '#Pesto', '#Énorme'],
    isSignature: true,
    isVegetarian: false
  },
  {
    name: 'Le Deluxe Burger',
    price: 40.00,
    description: 'Filet de bœuf tendre, camembert rôti, cheddar coulant, bacon croustillant, champignons sautés et sauce BBQ.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    category: 'Signatures',
    preparationTime: 14,
    tags: ['#Camembert', '#Filet', '#BBQ'],
    isSignature: true,
    isVegetarian: false
  },
  {
    name: 'Le Zinkoholic Burger',
    price: 32.90,
    description: 'Steak de 180g, oignons caramélisés fondants, triple portion de cheddar, dinde fumée et bacon croustillant.',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
    category: 'Signatures',
    preparationTime: 12,
    tags: ['#TripleCheddar', '#Bacon', '#Gourmand'],
    isSignature: true,
    isVegetarian: false
  },
  {
    name: 'Le Terre à Terre Burger',
    price: 32.90,
    description: 'L\'expérience rustique du Zink : bœuf savoureux, champignons forestiers et fromages fondus pour les amoureux de la terre.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    category: 'Classiques',
    preparationTime: 12,
    tags: ['#Champignons', '#Authentique'],
    isSignature: false,
    isVegetarian: false
  },
  {
    name: 'Le Dingue de Toi',
    price: 29.90,
    description: 'Steak juteux 180g, double cheddar affiné, tranches de dinde fumée, sauce césar maison et roquette poivrée.',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80',
    category: 'Classiques',
    preparationTime: 11,
    tags: ['#SauceCésar', '#Roquette', '#DindeFumée'],
    isSignature: false,
    isVegetarian: false
  },
  {
    name: 'Le Berlusconi',
    price: 29.90,
    description: 'L\'Italie dans un burger : Bœuf, cœur de burrata crémeuse, gorgonzola de caractère, éclats de parmesan et sauce pesto.',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    category: 'Classiques',
    preparationTime: 13,
    tags: ['#Burrata', '#Gorgonzola', '#Pesto'],
    isSignature: false,
    isVegetarian: false
  },
  {
    name: 'Le Johnny Depp',
    price: 28.90,
    description: 'Bœuf grillé, cheddar onctueux, rondelles de chorizo épicé et purée de guacamole frais.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    category: 'Classiques',
    preparationTime: 10,
    tags: ['#Chorizo', '#Guacamole', '#Épicé'],
    isSignature: false,
    isVegetarian: false
  },
  {
    name: 'Le Chicken César Burger',
    price: 19.90,
    description: 'Généreux filet de poulet pané, parmesan, salade croquante et la fameuse sauce César.',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=800&q=80',
    category: 'Poulet',
    preparationTime: 11,
    tags: ['#PouletPané', '#César'],
    isSignature: false,
    isVegetarian: false
  },
  {
    name: 'L\'Herbivore',
    price: 23.90,
    description: 'Galette végétarienne fondante, légumes grillés de saison, fromage et sauce légère.',
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=800&q=80',
    category: 'Végétariens',
    preparationTime: 10,
    tags: ['#Veggie', '#LégumesGrillés'],
    isSignature: false,
    isVegetarian: true
  },
  {
    name: 'Salade Burrata',
    price: 31.90,
    description: 'Généreuse boule de burrata italienne, tomates cerises, basilic frais, huile d\'olive extra vierge.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    category: 'Accompagnements',
    preparationTime: 8,
    tags: ['#Burrata', '#Fraîcheur'],
    isSignature: false,
    isVegetarian: true
  },
  {
    name: 'Salade César',
    price: 24.90,
    description: 'Salade romaine croquante, filet de poulet grillé, croûtons à l\'ail, parmesan et sauce César onctueuse.',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80',
    category: 'Accompagnements',
    preparationTime: 8,
    tags: ['#César', '#PouletGrillé'],
    isSignature: false,
    isVegetarian: false
  },
  {
    name: 'Limonade Artisanale',
    price: 4.00,
    description: 'Boisson rafraîchissante au citron frais et menthe pour accompagner votre burger.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    category: 'Boissons',
    preparationTime: 2,
    tags: ['#Citron', '#Menthe'],
    isSignature: false,
    isVegetarian: true
  }
];

const seedDatabase = async () => {
  try {
    await Dish.deleteMany({});
    console.log('Anciens plats supprimés');
    
    await Dish.insertMany(dishesData);
    console.log('Base de données initialisée avec succès avec les 12 plats du Zink !');
  } catch (error) {
    console.error("Erreur lors de l'initialisation :", error);
  }
};

module.exports = seedDatabase;
