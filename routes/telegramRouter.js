const express = require('express');
const telegramAuthController = require('../controllers/telegramController');
const checkOriginTelegram = require('../middlewares/checkOriginTelegram'); // Importa il middleware

const router = express.Router();

router.post(
  '/callback',
  checkOriginTelegram,
  telegramAuthController.telegramAuthCallback,
);

module.exports = router;
