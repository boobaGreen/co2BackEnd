const express = require('express');
const userBotController = require('../controllers/userBotController');
// const authController = require('../controllers/authController');

const router = express.Router();

// Routes for reports
// router.route('/').get(testController.test);
router.route('/').get(userBotController.getDetailGroups);

module.exports = router;
