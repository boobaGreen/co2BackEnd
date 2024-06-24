const express = require('express');

const authController = require('../middlewares/authController');

const router = express.Router();

router.get('/me', authController.protect, (req, res) => {
  console.log('/me user: ', req.user);
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user,
    },
  });
});

module.exports = router;
