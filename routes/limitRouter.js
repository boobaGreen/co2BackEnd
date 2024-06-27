// limitRouter.js

const express = require('express');
const limitController = require('../controllers/limitController');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

const router = express.Router();

router
  .route('/generic')
  .post(isAdminMiddleware, limitController.createLimitGeneric);

module.exports = router;
