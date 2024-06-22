const express = require('express');

const router = express.Router();
const { telegramAuthCallback } = require('../controllers/telegramController');

// Route per la callback di autenticazione Telegram
router.post('/auth/callback', telegramAuthCallback);

module.exports = router;
