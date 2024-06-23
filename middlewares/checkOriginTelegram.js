/* eslint-disable camelcase */
const allowedCustomOrigins = ['secretorginipasswordtomorrowdevfromfe'];
const allowedRealOrigins = ['https://6b98-5-90-138-45.ngrok-free.app'];

const crypto = require('crypto');
const AppError = require('../utils/appError');

const checkOriginTelegram = (req, res, next) => {
  if (req.method === 'POST') {
    // Verifica l'intestazione personalizzata
    const customOrigin = req.get('X-Custom-Origin');
    console.log('Detected custom origin:', customOrigin);

    // Verifica l'intestazione reale dell'origine
    const realOrigin = req.get('Origin');
    console.log('Detected real origin:', realOrigin);

    if (!customOrigin || !allowedCustomOrigins.includes(customOrigin)) {
      console.log('Forbidden custom origin:', customOrigin);
      return res
        .status(403)
        .json({ status: 'fail', message: 'Forbidden custom origin' });
    }

    if (!realOrigin || !allowedRealOrigins.includes(realOrigin)) {
      console.log('Forbidden real origin:', realOrigin);
      return res
        .status(403)
        .json({ status: 'fail', message: 'Forbidden real origin' });
    }

    // Verifica HMAC
    const { id, first_name, username, photo_url, auth_date, hash } = req.body;

    // Calcola l'HMAC utilizzando la chiave segreta del tuo bot Telegram
    const secret = 'your_telegram_bot_secret'; // Sostituisci con la tua chiave segreta del bot Telegram
    const data = `${id}${first_name}${username}${photo_url}${auth_date}`;
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(data);
    const calculatedHash = hmac.digest('hex');
    console.log('calculatedHash : ', calculatedHash);
    console.log('hash : ', hash);
    if (hash !== calculatedHash) {
      return next(
        new AppError('Telegram authentication failed. Invalid HMAC.', 401),
      );
    }
  }

  // Passa al middleware successivo
  next();
};

module.exports = checkOriginTelegram;
