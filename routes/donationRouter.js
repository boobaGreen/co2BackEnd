const express = require('express');
const donationController = require('../controllers/donationController');
// const authController = require('../controllers/authController');

const router = express.Router();

// Routes for reports
router
  .route('/')
  .get(donationController.getAllDonation) // per tutti - verifica filtri
  .post(donationController.createDonation); // solo per bot

router
  .route('/:id')
  .get(donationController.getDonation) // per tutti - verifica filtri
  .patch(donationController.updateDonation) // solo per admin dell canale
  .delete(donationController.deleteDonation); // solo per admin del canale

module.exports = router;
