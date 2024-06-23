const allowedCustomOrigins = ['secretorginipasswordtomorrowdevfromfe'];
const allowedRealOrigins = ['https://6b98-5-90-138-45.ngrok-free.app'];

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
  }

  // Passa al middleware successivo
  next();
};

module.exports = checkOriginTelegram;
