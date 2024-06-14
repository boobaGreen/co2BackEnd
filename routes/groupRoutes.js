const express = require('express');
const groupController = require('../controllers/groupController');
// const authController = require('../controllers/authController');

const router = express.Router();

// Routes for reports
router
  .route('/')
  .get(groupController.getAllGroup) // per tutti - verifica filtri
  .post(groupController.createGroup); // solo per bot

router
  .route('/:id')
  .get(groupController.getGroup) // per tutti - verifica filtri
  .patch(groupController.updateGroup) // solo per admin dell canale
  .delete(groupController.deleteGroup); // solo per admin del canale

module.exports = router;
