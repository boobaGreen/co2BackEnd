/* eslint-disable camelcase */
const crypto = require('crypto');
const AppError = require('../utils/appError');

const allowedCustomOrigins = ['secretorginipasswordtomorrowdevfromfe'];
const allowedRealOrigins = ['https://6b98-5-90-138-45.ngrok-free.app'];

const checkOriginTelegram = (req, res, next) => {
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
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-unused-vars
  const { auth_date, first_name, id, username, photo_url, hash } = req.body;

  // Costruisci la stringa dati per HMAC in ordine alfabetico
  const data = `auth_date=${auth_date}\nfirst_name=${first_name}\nid=${id}\nphoto_url=${photo_url}\nusername=${username}`;

  // Calcola l'HMAC utilizzando la chiave segreta del tuo bot Telegram
  const secret = '7317510692:AAF20M_I-Gz8g8PCnbE3fPjCnwRM9cKF784'; // Sostituisci con la tua chiave segreta del bot Telegram
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(data);
  const calculatedHash = hmac.digest('hex');

  console.log('calculatedHash : ', calculatedHash);
  console.log('hash : ', hash);

  // Confronta hash calcolato con hash ricevuto
  if (hash !== calculatedHash) {
    return next(
      new AppError('Telegram authentication failed. Invalid HMAC.', 401),
    );
  }

  // Passa al middleware successivo
  next();
};

module.exports = checkOriginTelegram;
