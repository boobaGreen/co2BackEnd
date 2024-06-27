const jwt = require('jsonwebtoken');

const decodeJWT = (req, res, next) => {
  // Ottieni il token JWT dall'header Authorization
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing JWT' });
  }

  // Estrapola il token dal formato "Bearer <token>"
  const token = authHeader.split(' ')[1];

  try {
    // Decodifica il JWT utilizzando la chiave segreta (se necessario)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded); // Stampiamo le informazioni decodificate
    req.decodedJWT = decoded; // Aggiungiamo le informazioni decodificate all'oggetto della richiesta
    next();
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return res.status(403).json({ error: 'Invalid JWT' });
  }
};

module.exports = decodeJWT;
