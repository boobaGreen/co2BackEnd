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

// Funzione per verificare i dati iniziali ricevuti da Telegram
const verifyTelegramWebAppData = (telegramInitData) => {
  const initData = new URLSearchParams(telegramInitData);
  const hash = initData.get('hash');
  initData.delete('hash');

  // Seřadíme klíče a vytvoříme data-check-string
  const dataToCheck = [...initData.entries()]
    .map(([key, value]) => `${key}=${decodeURIComponent(value)}`)
    .sort()
    .join('\n');

  // Vytvoříme HMAC-SHA-256 podpis pro bot token s konstantou "WebAppData"
  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(process.env.TELEGRAM_BOT_TOKEN)
    .digest();
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
    console.log('Telegram authentication failed. HMAC missing.');
    return next(
      new AppError('Telegram authentication failed. HMAC missing.', 401),
    );
  }

  const isValid = verifyTelegramWebAppData(req.body); // Verifica i dati ricevuti da Telegram
  console.log('Verification result:', isValid);

  if (!isValid) {
    console.log('Telegram authentication failed. Invalid data.');
    return next(
      new AppError('Telegram authentication failed. Invalid data.', 401),
    );
  }

  // Cerca l'utente nel database per telegramId
  let user = await User.findOne({ telegramId: id });
  console.log('User found in database:', user);

  if (!user) {
    console.log('User not found in database. Creating new user.');
    // Se l'utente non esiste, crea un nuovo utente nel database
    user = await User.create({
      telegramId: id,
      userName: username,
      displayName: first_name,
    });
  } else {
    console.log('User found in database. Updating user details.');
    // Se l'utente esiste, aggiorna il nome utente e il nome visualizzato
    user.userName = username;
    user.displayName = first_name;
    await user.save();
  }

  // Invia il token JWT al client
  createSendToken(user, 200, res);
});
