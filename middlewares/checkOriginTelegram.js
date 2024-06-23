const checkOriginTelegram = (req, res, next) => {
  if (req.method === 'POST') {
    console.log('Headers:', req.headers);

    // Verifica l'intestazione personalizzata
    const origin = req.get('X-Custom-Origin');
    console.log('Detected origin:', origin);

    // Al momento non viene eseguito alcun controllo sull'origine
  }

  // Passa al middleware successivo
  next();
};

module.exports = checkOriginTelegram;
