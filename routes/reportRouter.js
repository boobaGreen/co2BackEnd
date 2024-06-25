const express = require('express');
const reportController = require('../controllers/reportController');
const checkAndCreateGroup = require('../middlewares/checkAndCreateGroup');
const checkOrigin = require('../middlewares/checkOrigin'); // Importa il middleware
const authController = require('../middlewares/authController');

const router = express.Router();

// Routes for reports
router
  .route('/')
  .get(authController.verifyJWT, reportController.getAllReport) // per tutti - verifica filtri
  .post(checkOrigin, checkAndCreateGroup, reportController.createReport); // Middleware inserito prima di createReport

router.route('/:id').get(authController.verifyJWT, reportController.getReport); // per tutti - verifica filtri

module.exports = router;
