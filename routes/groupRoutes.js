const express = require('express');
const groupController = require('../controllers/groupController');

const authController = require('../middlewares/authController');

const router = express.Router();

// Routes for reports
router
  .route('/')
  .get(authController.verifyJWT, groupController.getAllGroup) // per tutti - verifica filtri
  .post(authController.verifyJWT, groupController.createGroup); // solo per bot***da aggiungere auth

router.route('/:id').get(authController.verifyJWT, groupController.getGroup); // per tutti - verifica filtri
// .patch(groupController.updateGroup) // solo per admin dell canale
// .delete(groupController.deleteGroup); // solo per admin del canale

module.exports = router;
