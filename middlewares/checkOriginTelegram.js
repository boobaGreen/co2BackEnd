const checkOriginTelegram = (req, res, next) => {
  if (req.method === 'POST') {
    console.log('Headers:', req.headers);

    // Verifica l'intestazione personalizzata
    const origin = req.get('X-Custom-Origin');
    console.log('Detected origin **************:', origin);

    // Temporaneamente non blocca nessuna origine, solo logga
    // const allowedOriginsTelegram = ['supersegretissimo'];

    // if (!origin || !allowedOriginsTelegram.includes(origin)) {
    //   console.log('Forbidden origin:', origin);
    //   return res.status(403).json({ status: 'fail', message: 'Forbidden' });
    // }
  }

  // Passa al middleware successivo
  next();
};

module.exports = checkOriginTelegram;
