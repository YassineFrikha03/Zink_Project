// server.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// Import des routes
const dishRoutes = require('./routes/dishRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const staffRoutes = require('./routes/staffRoutes');

// Connexion à la base de données
connectDB();

const Dish = require('./models/Dish');
const seedDatabase = require('./seed');

// Auto-seeding au démarrage si la base est vide
setTimeout(async () => {
  try {
    const count = await Dish.countDocuments();
    if (count === 0) {
      console.log('Base de données vide détectée. Lancement de l\'auto-seeding...');
      await seedDatabase();
    }
  } catch (err) {
    console.error('Erreur lors de la vérification/seeding au démarrage :', err.message);
  }
}, 3000);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
  res.send('API du restaurant en ligne !');
});

// Route de Seeding (pour réinitialiser via navigateur ou API)
app.all('/api/seed', async (req, res) => {
  try {
    const dishes = await seedDatabase();
    res.status(200).json({
      success: true,
      message: 'Base de données réinitialisée et peuplée avec succès !',
      count: dishes.length,
      data: dishes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors du seeding',
      error: error.message,
    });
  }
});

// Montage des routes API
app.use('/api/dishes', dishRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/staff', staffRoutes);

// Middleware de gestion d'erreurs 404
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée sur ce serveur',
  });
});

// Middleware de gestion d'erreurs globale
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Erreur interne du serveur',
  });
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});