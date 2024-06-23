const express = require('express');
const telegramAuthController = require('../controllers/telegramController');
const checkOriginTelegram = require('../middlewares/checkOriginTelegram'); // Assicurati che il percorso sia corretto

const router = express.Router();

router.post(
  '/',
  checkOriginTelegram,
  telegramAuthController.telegramAuthCallback,
);

module.exports = router;
