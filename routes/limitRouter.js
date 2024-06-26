// limitRouter.js

const express = require('express');
const limitController = require('../controllers/limitController');

const router = express.Router();

router.route('/generic').post(limitController.createLimitGeneric);

router.route('/generic/:chatId').delete(limitController.deleteLimitGeneric);

module.exports = router;
