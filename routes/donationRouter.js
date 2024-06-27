const express = require('express');
const donationController = require('../controllers/donationController');
// const authController = require('../controllers/authController');

const router = express.Router();
console.log('donation router');
// Routes for reports
router
  .route('/')
  .get(donationController.getAllDonation) // per tutti - verifica filtri
  .post(donationController.createDonation); // aggiungi il middleware qui

router.route('/:id').get(donationController.getDonation); // per tutti - verifica filtri

module.exports = router;
