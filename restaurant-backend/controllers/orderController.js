// controllers/orderController.js
const Order = require('../models/Order');
const Dish = require('../models/Dish');

// @desc    Créer une nouvelle commande
// @route   POST /api/orders
// @access  Public
exports.createOrder = async (req, res) => {
  try {
    const { user, customerInfo, items, orderType, paymentMethod, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'La commande doit contenir au moins un article',
      });
    }

    // Calcul automatique et vérification du montant total
    let calculatedTotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const dish = await Dish.findById(item.dish);
      if (!dish) {
        return res.status(404).json({
          success: false,
          message: `Plat introuvable (ID: ${item.dish})`,
        });
      }
      
      const itemPrice = item.price || dish.price;
      calculatedTotal += itemPrice * item.quantity;
      
      validatedItems.push({
        dish: dish._id,
        name: dish.name,
        quantity: item.quantity,
        price: itemPrice,
        selectedOptions: item.selectedOptions || [],
      });
    }

    const order = await Order.create({
      user: user || null,
      customerInfo,
      items: validatedItems,
      totalAmount: req.body.totalAmount || calculatedTotal,
      orderType: orderType || 'À emporter',
      paymentMethod: paymentMethod || 'Carte',
      notes,
    });

    res.status(201).json({
      success: true,
      message: 'Commande enregistrée avec succès',
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la création de la commande',
      error: error.message,
    });
  }
};

// @desc    Récupérer toutes les commandes (filtrables par statut ou type)
// @route   GET /api/orders
// @access  Private/Admin/Staff
exports.getOrders = async (req, res) => {
  try {
    const { status, orderType } = req.query;
    let query = {};

    if (status) query.status = status;
    if (orderType) query.orderType = orderType;

    const orders = await Order.find(query)
      .populate('user', 'name email')
      .populate('items.dish', 'name image category')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des commandes',
      error: error.message,
    });
  }
};

// @desc    Récupérer une commande par son ID
// @route   GET /api/orders/:id
// @access  Public / Private
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate('items.dish', 'name image category price');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée',
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la commande',
      error: error.message,
    });
  }
};

// @desc    Récupérer les commandes d'un client spécifique
// @route   GET /api/orders/user/:userId
// @access  Private
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate('items.dish', 'name image')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de l\'historique des commandes',
      error: error.message,
    });
  }
};

// @desc    Mettre à jour le statut d'une commande (ex: cuisine / livraison)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin/Staff
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    const updateFields = {};
    if (status) updateFields.status = status;
    if (paymentStatus) updateFields.paymentStatus = paymentStatus;

    const order = await Order.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Statut de la commande mis à jour avec succès',
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la commande',
      error: error.message,
    });
  }
};

// @desc    Supprimer / Annuler une commande
// @route   DELETE /api/orders/:id
// @access  Private/Admin
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Commande non trouvée',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Commande supprimée avec succès',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la commande',
      error: error.message,
    });
  }
};
