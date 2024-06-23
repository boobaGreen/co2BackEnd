/* eslint-disable camelcase */
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Importa il modello User corretto
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Funzione per generare il token JWT
const signToken = (_id) => {
  // Usa una stringa che rappresenta una durata, ad esempio '24h' per 24 ore
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRES_IN_HOURS}h`,
  });
};

// Funzione per creare e inviare il token JWT
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_IN_HOURS * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: true, // Always set to true for HTTPS
    domain:
      process.env.NODE_ENV === 'production'
        ? process.env.PRODUCTION_DOMAIN_FE
        : process.env.DEVELOPMENT_DOMAIN_FE,
    sameSite: 'none',
  };

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// Controller per gestire la callback di autenticazione Telegram
exports.telegramAuthCallback = catchAsync(async (req, res, next) => {
  const { id, first_name, username, hash } = req.body;
  console.log('telegramAuthCallback');
  console.log('req.body : ', req.body);

  // hmac non viene verificato nella sua integrita' ma verifico che ci sia
  if (!hash) {
    return next(
      new AppError('Telegram authentication failed. HMAC missing.', 401),
    );
  }

  let user = await User.findOne({ telegramId: id });
  console.log('user : ', user);

  if (!user) {
    user = await User.create({
      telegramId: id,
      userName: username,
      displayName: first_name,
    });
  } else {
    user.userName = username;
    user.displayName = first_name;
    await user.save();
  }

  // Invia il token JWT al client
  createSendToken(user, 200, res);
});
