/* eslint-disable camelcase */
require('dotenv').config();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Importa il modello User corretto
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Funzione per generare il token JWT
const signToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN_HOURS * 60 * 60 * 1000,
  });
};

// Funzione per creare e inviare il token JWT
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN_HOURS * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
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

// Funzione per verificare i dati ricevuti da Telegram con HMAC
const verifyTelegramWebAppData = (telegramInitData) => {
  const initData = new URLSearchParams(telegramInitData);
  const hash = initData.get('hash');
  initData.delete('hash');

  // Ordina le chiavi e crea la stringa data-check
  const dataToCheck = [...initData.entries()]
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}=${decodeURIComponent(value)}`)
    .join('\n');

  // Calcola l'HMAC-SHA-256 con il token del bot Telegram
  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(process.env.TELEGRAM_BOT_TOKEN)
    .digest('hex');
  const computedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataToCheck)
    .digest('hex');

  console.log('Data to check:', dataToCheck);
  console.log('Computed hash:', computedHash);
  console.log('Provided hash:', hash);

  return computedHash === hash;
};

// Controller per gestire la callback di autenticazione Telegram
exports.telegramAuthCallback = catchAsync(async (req, res, next) => {
  const { id, first_name, username, hash } = req.body;
  console.log('telegramAuthCallback');
  console.log('req.body : ', req.body);

  if (!hash) {
    return next(
      new AppError('Telegram authentication failed. HMAC missing.', 401),
    );
  }

  // Verifica i dati con la funzione verifyTelegramWebAppData
  const isVerified = verifyTelegramWebAppData(req.body);

  if (!isVerified) {
    console.log('HMAC mismatch');
    return next(
      new AppError('Telegram authentication failed. HMAC mismatch.', 401),
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
