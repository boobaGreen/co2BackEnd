/* eslint-disable camelcase */

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Importa il modello User corretto
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Funzione per generare il token JWT
const signToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
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

// Controller per gestire la callback di autenticazione Telegram
exports.telegramAuthCallback = catchAsync(async (req, res, next) => {
  const { id, first_name, username } = req.body;

  // Verifica se x-telegram-auth è presente e corretto
  if (!req.headers['x-telegram-auth']) {
    return next(
      new AppError('Telegram authentication failed. HMAC missing.', 401),
    );
  }

  const originalHash = Buffer.from(req.headers['x-telegram-auth'], 'hex');

  // Verifica se originalHash è definito e non vuoto
  if (!originalHash || originalHash.length === 0) {
    return next(
      new AppError('Telegram authentication failed. Invalid HMAC.', 401),
    );
  }

  // Validazione del dato hash con HMAC
  const data = {
    auth_date: req.body.auth_date,
    first_name,
    id,
    username,
  };

  const checkString = Object.keys(data)
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join('\n');

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const hmacKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(Buffer.from(botToken, 'utf8'))
    .digest();

  const hmac = crypto.createHmac('sha256', hmacKey);
  hmac.update(checkString);
  const computedHash = hmac.digest();

  if (!crypto.timingSafeEqual(computedHash, originalHash)) {
    return next(
      new AppError('Telegram authentication failed. HMAC mismatch.', 401),
    );
  }

  // Cerca l'utente nel database per telegramId
  let user = await User.findOne({ telegramId: id });

  if (!user) {
    // Se l'utente non esiste, crea un nuovo utente nel database
    user = await User.create({
      telegramId: id,
      userName: username,
      displayName: first_name,
    });
  } else {
    // Se l'utente esiste, aggiorna il nome utente e il nome visualizzato
    user.userName = username;
    user.displayName = first_name;
    await user.save();
  }

  // Invia il token JWT al client
  createSendToken(user, 200, res);
});
