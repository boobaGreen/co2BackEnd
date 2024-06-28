// limitRouter.js

const express = require('express');
const limitController = require('../controllers/limitController');
const decodeJWT = require('../middlewares/decodeJwtTest'); // Assuming correct middleware import

const router = express.Router();

// Route for creating a generic limit
router.post('/generic', decodeJWT, limitController.createLimitGeneric);

// Route for deleting a generic limit by chatId
router.delete(
  '/generic/:chatId',
  decodeJWT,
  limitController.deleteLimitGeneric,
);

module.exports = router;
