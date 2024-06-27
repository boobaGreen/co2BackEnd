const express = require('express');
const reportController = require('../controllers/reportController');
const checkAndCreateGroup = require('../middlewares/checkAndCreateGroup');
const checkOrigin = require('../middlewares/checkOrigin'); // Importa il middleware
const {
  populateGroupReference,
} = require('../middlewares/addGroupReferenceToReport'); // Importa il nuovo middleware

const router = express.Router();

// Routes for reports
router
  .route('/')
  .get(reportController.getAllReport) // per tutti - verifica filtri
  .post(
    checkOrigin,
    checkAndCreateGroup,
    populateGroupReference,
    reportController.createReport,
  ); // Middleware inserito prima di createReport

router.route('/:id').get(reportController.getReport); // per tutti - verifica filtri

module.exports = router;
