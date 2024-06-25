const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel'); // Assicurati di importare il modello User corretto

// Funzione per verificare il JWT
exports.verifyJWT = async (req, res, next) => {
  console.log('Verifica JWT...'); // Solo per scopi di debug
  console.log(req.headers); // Solo per scopi di debug

  // 1) Ottenere il token e verificare la sua presenza
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log({ token });
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'You are not logged in! Please log in to access.',
    });
  }

  try {
    // 2) Verifica il token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log({ decoded });

    // Verifica se il token è scaduto (gestito automaticamente da jwt.verify)
    if (Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please log in again.',
      });
    }

    // Opzionale: Verifica se il token è stato emesso troppo tempo fa (es. oltre 30 giorni fa)
    const maxTokenAge = 30 * 24 * 60 * 60 * 1000; // 30 giorni in millisecondi
    if (Date.now() - decoded.iat * 1000 > maxTokenAge) {
      return res.status(401).json({
        success: false,
        message: 'Token is too old. Please log in again.',
      });
    }

    // 3) Verifica se l'utente esiste ancora
    const currentUser = await User.findById(decoded._id);
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: 'The user belonging to this token does no longer exist.',
      });
    }

    // Token valido, restituisci i dettagli dell'utente
    res.status(200).json({
      success: true,
      userId: currentUser._id,
      userName: currentUser.userName,
      userNick: currentUser.displayName,
      // Aggiungi altri dettagli dell'utente che desideri inviare al frontend
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token. Please log in again.',
    });
  }
};
