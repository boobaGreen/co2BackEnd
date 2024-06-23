const allowedOrigins = ['secretorginipasswordtomorrowdevfromfe'];

const checkOriginTelegram = (req, res, next) => {
  if (req.method === 'POST') {
    const origin = req.get('X-Custom-Origin');
    if (!origin || !allowedOrigins.includes(origin)) {
      console.log('Forbidden origin:', origin);
      return res.status(403).json({ status: 'fail', message: 'Forbidden' });
    }
  }

  // Passa al middleware successivo
  next();
};

module.exports = checkOriginTelegram;
