/* eslint-disable camelcase */
const CryptoJS = require('crypto-js');
const AppError = require('../utils/appError');

// Array di origini consentite
const allowedCustomOrigins = ['secretorginipasswordtomorrowdevfromfe'];
const allowedRealOrigins = ['https://8205-5-90-138-45.ngrok-free.app'];

// const secretKey = process.env.SECRET_KEY; // Chiave segreta salvata nelle variabili di ambiente
const secretKey = process.env.SECRET_KEY; // Chiave segreta salvata nelle variabili di ambiente

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
  // eslint-disable-next-line camelcase
  const { auth_date, first_name, id, username, photo_url, hash } = req.body;

  try {
    // Decrittografa i dati ricevuti con AES
    const bytes = CryptoJS.AES.decrypt(hash, secretKey);
    const decryptedDataString = bytes.toString(CryptoJS.enc.Utf8);

    // Costruisci la stringa dati attesa per il confronto
    const expectedDataString = `${auth_date}${first_name}${id}${username}${photo_url}`;
    console.log('Decrypted data:', decryptedDataString);
    console.log('Expected data:', expectedDataString);
    // Confronta i dati decrittografati con i dati attesi
    if (decryptedDataString !== expectedDataString) {
      throw new AppError(
        'Telegram authentication failed. Decrypted data does not match expected data.',
        401,
      );
    }

    console.log('Decryption and verification successful.');

    // Passa al middleware successivo
    next();
  } catch (error) {
    return next(new AppError('Error during authentication.', 401));
  }
};

module.exports = checkTelegramAuthorization;
