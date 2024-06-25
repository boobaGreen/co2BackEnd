// verifyJwtRouter.js

const express = require('express');
const jwtController = require('../controllers/jwtVerifyController');
// const authController = require('../controllers/authController');

const router = express.Router();

// Routes for reports
router.route('/').get(jwtController.verifyJWT); // per tutti - verifica filtri

module.exports = router;
