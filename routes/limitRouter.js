// limitRouter.js

const express = require('express');
const limitController = require('../controllers/limitController');
// const isAdminMiddleware = require('../middlewares/isAdminMiddleware');
const decodedJWT = require('../middlewares/decodeJwtTest');

const router = express.Router();

router
  .route('/generic')
  .post(decodedJWT.decodeJWT, limitController.createLimitGeneric);

router
  .route('/generic/:chatId')
  .delete(decodedJWT.decodeJWT, limitController.deleteLimitGeneric);

module.exports = router;
