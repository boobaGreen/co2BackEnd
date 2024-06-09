const express = require('express');
const reportController = require('../controllers/reportController');
// const authController = require('../controllers/authController');

const router = express.Router();

// Routes for reports
router
  .route('/')
  .get(reportController.getAllReport) // per tutti - verifica filtri
  .post(reportController.createReport); // solo per bot

router
  .route('/:id')
  .get(reportController.getReport) // per tutti - verifica filtri
  .patch(reportController.updateReport) // solo per admin dell canale
  .delete(reportController.deleteReport); // solo per admin del canale

module.exports = router;
