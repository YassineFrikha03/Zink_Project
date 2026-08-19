// controllers/dishController.js
const Dish = require('../models/Dish');
const { dishesData } = require('../seed');

// @desc    Récupérer tous les plats (avec filtres, recherche et tri)
// @route   GET /api/dishes
// @access  Public
exports.getAllDishes = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, isVegetarian, sort } = req.query;

    // Construction du filtre
    let query = {};

    if (category && category !== 'TOUS') {
      query.category = category;
    }

    if (isVegetarian !== undefined) {
      query.isVegetarian = isVegetarian === 'true';
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { ingredients: { $regex: search, $options: 'i' } },
      ];
    }

    // Exécution de la requête avec tri sur MongoDB
    let dishesQuery = Dish.find(query);

    if (sort) {
      dishesQuery = dishesQuery.sort(sort);
    } else {
      dishesQuery = dishesQuery.sort('-createdAt');
    }

    let dishes = await dishesQuery;

    // Fallback si la base est vide ou non initialisée
    if (!dishes || dishes.length === 0) {
      dishes = dishesData;
      if (category && category !== 'TOUS') {
        dishes = dishes.filter(d => d.category === category);
      }
      if (search) {
        const s = search.toLowerCase();
        dishes = dishes.filter(d => d.name.toLowerCase().includes(s) || d.description.toLowerCase().includes(s));
      }
    }

    res.status(200).json({
      success: true,
      count: dishes.length,
      data: dishes,
    });
  } catch (error) {
    // Résilience en cas de mode hors ligne ou IP Atlas non whitelistée
    console.warn('Mode fallback (MongoDB indisponible ou IP non whitelistée), retour du menu officiel Le Zink:', error.message);
    let dishes = dishesData || [];
    const { category, search } = req.query;
    if (category && category !== 'TOUS') {
      dishes = dishes.filter(d => d.category === category);
    }
    if (search) {
      const s = search.toLowerCase();
      dishes = dishes.filter(d => d.name.toLowerCase().includes(s) || d.description.toLowerCase().includes(s));
    }
    res.status(200).json({
      success: true,
      count: dishes.length,
      data: dishes,
      offlineFallback: true
    });
  }
};


// @desc    Récupérer un plat spécifique par ID
// @route   GET /api/dishes/:id
// @access  Public
exports.getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);

    if (!dish) {
      const fallbackDish = dishesData.find(d => d._id === req.params.id || d.name === req.params.id);
      if (fallbackDish) {
        return res.status(200).json({ success: true, data: fallbackDish });
      }
      return res.status(404).json({
        success: false,
        message: 'Plat non trouvé avec cet identifiant',
      });
    }

    res.status(200).json({
      success: true,
      data: dish,
    });
  } catch (error) {
    const fallbackDish = dishesData.find(d => d._id === req.params.id || d.name === req.params.id || (dishesData.indexOf(d) + '').includes(req.params.id));
    if (fallbackDish) {
      return res.status(200).json({ success: true, data: fallbackDish, offlineFallback: true });
    }
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération du plat',
      error: error.message,
    });
  }
};

// @desc    Créer un nouveau plat
// @route   POST /api/dishes
// @access  Private/Admin (ou Public en dev)
exports.createDish = async (req, res) => {
  try {
    const dish = await Dish.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Plat créé avec succès',
      data: dish,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la création du plat',
      error: error.message,
    });
  }
};

// @desc    Mettre à jour un plat existant
// @route   PUT /api/dishes/:id
// @access  Private/Admin
exports.updateDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Retourne le document modifié
      runValidators: true, // Exécute les validations du schéma
    });

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: 'Plat non trouvé avec cet identifiant',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Plat mis à jour avec succès',
      data: dish,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la mise à jour du plat',
      error: error.message,
    });
  }
};

// @desc    Supprimer un plat
// @route   DELETE /api/dishes/:id
// @access  Private/Admin
exports.deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findByIdAndDelete(req.params.id);

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: 'Plat non trouvé avec cet identifiant',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Plat supprimé avec succès',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du plat',
      error: error.message,
    });
  }
};
