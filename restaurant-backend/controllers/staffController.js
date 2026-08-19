// controllers/staffController.js
const fs = require('fs');
const path = require('path');

const pinsFilePath = path.join(__dirname, '../staffPins.json');

// Helper pour lire ou initialiser les PINs
const getStoredPins = () => {
  if (fs.existsSync(pinsFilePath)) {
    try {
      return JSON.parse(fs.readFileSync(pinsFilePath, 'utf8'));
    } catch (err) {
      console.error('Erreur lecture staffPins.json:', err);
    }
  }
  return {
    ADMIN: '2014',
    CHEF: '1234',
    CAISSIER: '0000',
    LOGISTIQUE: '9999'
  };
};

// Helper pour sauvegarder les PINs
const saveStoredPins = (pins) => {
  fs.writeFileSync(pinsFilePath, JSON.stringify(pins, null, 2), 'utf8');
};

// @desc    Vérifier un code PIN et obtenir l'autorisation et le rôle
// @route   POST /api/staff/verify-pin
// @access  Public
exports.verifyPin = async (req, res) => {
  try {
    const { role, pinCode } = req.body;
    if (!role || !pinCode) {
      return res.status(400).json({ success: false, message: 'Rôle et code PIN requis.' });
    }

    const pins = getStoredPins();
    const expectedPin = pins[role] || (role === 'ADMIN' ? '2014' : role === 'CHEF' ? '1234' : role === 'CAISSIER' ? '0000' : '9999');

    if (pinCode.toString().trim() !== expectedPin.toString().trim()) {
      return res.status(401).json({
        success: false,
        message: `Code PIN incorrect pour le rôle ${role}. Accès refusé.`
      });
    }

    res.status(200).json({
      success: true,
      message: `Authentification réussie pour le rôle ${role}`,
      data: {
        role,
        verified: true,
        token: 'ZINK_STAFF_TOKEN_' + role + '_' + expectedPin
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification du code PIN',
      error: error.message
    });
  }
};

// @desc    Récupérer les codes PIN de tous les rôles (Réservé au Gérant/Super Admin)
// @route   GET /api/staff/pins
// @access  Public (ou protégé par x-admin-role: ADMIN)
exports.getAllPins = async (req, res) => {
  try {
    const pins = getStoredPins();
    res.status(200).json({
      success: true,
      data: pins
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des codes PIN',
      error: error.message
    });
  }
};

// @desc    Mettre à jour le code PIN d'un rôle
// @route   PUT /api/staff/pins
// @access  Public / Admin
exports.updatePin = async (req, res) => {
  try {
    const { role, newPin } = req.body;
    if (!role || !newPin || newPin.toString().trim().length < 4) {
      return res.status(400).json({
        success: false,
        message: 'Veuillez fournir un code PIN valide d\'au moins 4 chiffres.'
      });
    }

    const pins = getStoredPins();
    pins[role] = newPin.toString().trim();
    saveStoredPins(pins);

    res.status(200).json({
      success: true,
      message: `Code PIN pour ${role} mis à jour avec succès : "${newPin}"`,
      data: pins
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du code PIN',
      error: error.message
    });
  }
};
