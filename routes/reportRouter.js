// reportRouter.js
const express = require('express');
const reportController = require('../controllers/reportController');
const checkAndCreateGroup = require('../middlewares/checkAndCreateGroup'); // Importa il middleware

const router = express.Router();

// Routes for reports
router
  .route('/')
  .get(reportController.getAllReport) // per tutti - verifica filtri
  .post(checkAndCreateGroup, reportController.createReport); // Middleware inserito prima di createReport

router
  .route('/:id')
  .get(reportController.getReport) // per tutti - verifica filtri
  .patch(checkAndCreateGroup, reportController.updateReport) // Middleware inserito prima di updateReport
  .delete(reportController.deleteReport); // solo per admin del canale

module.exports = router;
