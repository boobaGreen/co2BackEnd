const crypto = require('crypto');
const AppError = require('./appError');

// Funzione per verificare i dati ricevuti da Telegram con HMAC
const verifyTelegramWebAppData = (telegramInitData) => {
  const initData = new URLSearchParams(telegramInitData);
  const hash = initData.get('hash');
  initData.delete('hash');

  // Creazione del data-check-string
  const dataToCheck = [...initData.entries()]
    .map(([key, value]) => `${key}=${decodeURIComponent(value)}`)
    .sort() // Ordinamento alfabetico delle chiavi
    .join('\n'); // Concatenazione con newline

  // Creazione della chiave segreta HMAC
  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(process.env.TELEGRAM_BOT_TOKEN)
    .digest('hex');

  // Calcolo dell'HMAC-SHA-256 dei dati
  const computedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataToCheck)
    .digest('hex');

  // Confronto tra l'hash calcolato e quello ricevuto
  if (computedHash !== hash) {
    throw new AppError('Telegram authentication failed. HMAC mismatch.', 401);
  }

  return true; // Dati validati correttamente
};

module.exports = verifyTelegramWebAppData;
