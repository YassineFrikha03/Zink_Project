// controllers/reservationController.js
const Reservation = require('../models/Reservation');

// @desc    Créer une nouvelle réservation de table
// @route   POST /api/reservations
// @access  Public
exports.createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Réservation enregistrée avec succès. Nous vous confirmerons par email ou SMS.',
      data: reservation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de l\'enregistrement de la réservation',
      error: error.message,
    });
  }
};

// @desc    Récupérer toutes les réservations (avec filtres par date / statut)
// @route   GET /api/reservations
// @access  Private/Admin/Staff
exports.getReservations = async (req, res) => {
  try {
    const { date, status } = req.query;
    let query = {};

    if (date) {
      // Recherche sur la journée
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      query.date = { $gte: startOfDay, $lte: endOfDay };
    }

    if (status) {
      query.status = status;
    }

    const reservations = await Reservation.find(query)
      .populate('user', 'name email')
      .sort({ date: 1, time: 1 }); // Tri chronologique

    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des réservations',
      error: error.message,
    });
  }
};

// @desc    Récupérer une réservation par ID
// @route   GET /api/reservations/:id
// @access  Private
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('user', 'name email phone');

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée',
      });
    }

    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la réservation',
      error: error.message,
    });
  }
};

// @desc    Mettre à jour le statut ou assigner une table
// @route   PUT /api/reservations/:id/status
// @access  Private/Admin/Staff
exports.updateReservationStatus = async (req, res) => {
  try {
    const { status, tableNumber } = req.body;
    const updateFields = {};

    if (status) updateFields.status = status;
    if (tableNumber !== undefined) updateFields.tableNumber = tableNumber;

    const reservation = await Reservation.findByIdAndUpdate(req.params.id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Réservation mise à jour avec succès',
      data: reservation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la réservation',
      error: error.message,
    });
  }
};

// @desc    Supprimer une réservation
// @route   DELETE /api/reservations/:id
// @access  Private/Admin
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Réservation non trouvée',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Réservation supprimée avec succès',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la réservation',
      error: error.message,
    });
  }
};
