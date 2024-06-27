// isAdminMiddleware.js

const Group = require('../models/groupModel');
const AppError = require('../utils/appError');

// Middleware per verificare se l'utente è un admin del gruppo
const isAdminMiddleware = async (req, res, next) => {
  try {
    const { userId } = req.user; // Dati dell'utente estratti dal JWT

    // Verifica se l'utente è un admin del gruppo
    const group = await Group.findOne({
      groupId: req.body.chatId, // Assumendo che chatId contenga l'ID del gruppo
      adminNames: userId, // userId corrisponde all'ID dell'utente autenticato
    });

    if (!group) {
      return next(new AppError('Only admins can set group limits.', 403));
    }

    // Se l'utente è un admin, procedi con la creazione del limite
    next();
  } catch (error) {
    console.error('Error in isAdminMiddleware:', error);
    next(new AppError('Internal server error.', 500));
  }
};

module.exports = isAdminMiddleware;
