/* eslint-disable camelcase */
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');

// Array di origini consentite
const allowedCustomOrigins = ['secretorginipasswordtomorrowdevfromfe'];
const allowedRealOrigins = ['https://6b98-5-90-138-45.ngrok-free.app'];
const secret = process.env.TELEGRAM_BOT_TOKEN;

// Middleware per verificare l'autorizzazione Telegram
const checkTelegramAuthorization = async (req, res, next) => {
  if (req.method !== 'POST') {
    return next(
      new AppError(
        'Method not allowed. Only POST method is allowed for Telegram authentication.',
        405,
      ),
    );
  }

  // Verifica l'intestazione personalizzata
  const customOrigin = req.get('X-Custom-Origin');
  console.log('Detected custom origin:', customOrigin);

  // Verifica l'intestazione reale dell'origine
  const realOrigin = req.get('Origin');
  console.log('Detected real origin:', realOrigin);

  // Verifica se l'origine personalizzata è consentita
  if (!customOrigin || !allowedCustomOrigins.includes(customOrigin)) {
    console.log('Forbidden custom origin:', customOrigin);
    return res
      .status(403)
      .json({ status: 'fail', message: 'Forbidden custom origin' });
  }

  // Verifica se l'origine reale è consentita
  if (!realOrigin || !allowedRealOrigins.includes(realOrigin)) {
    console.log('Forbidden real origin:', realOrigin);
    return res
      .status(403)
      .json({ status: 'fail', message: 'Forbidden real origin' });
  }

  // Estrai i dati necessari dalla richiesta
  const { auth_date, first_name, id, username, photo_url, hash } = req.body;

  try {
    // Costruisci la stringa dati per l'hashing
    const dataString = `${auth_date}${first_name}${id}${username}${photo_url}`;
    console.log('dataString:', dataString);

    // Verifica se il hash ricevuto corrisponde ai dati inviati
    const match = await bcrypt.compare(dataString + secret, hash);

    if (!match) {
      throw new AppError('Telegram authentication failed. Invalid hash.', 401);
    }

    console.log('Hash verified successfully.');

    // Passa al middleware successivo
    next();
  } catch (error) {
    return next(new AppError('Error during authentication.', 401));
  }
};

module.exports = checkTelegramAuthorization;
