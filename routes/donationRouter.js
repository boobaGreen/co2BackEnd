const express = require('express');
const donationController = require('../controllers/donationController');
const authController = require('../middlewares/authController');
// const authController = require('../controllers/authController');

const router = express.Router();

// Routes for reports
router
  .route('/')
  .get(authController.verifyJWT, donationController.getAllDonation) // per tutti - verifica filtri
  .post(authController.verifyJWT, donationController.createDonation); // solo per bot

router
  .route('/:id')
  .get(authController.verifyJWT, donationController.getDonation); // per tutti - verifica filtri

module.exports = router;
