// authController.js

const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel'); // Assicurati di importare il modello User corretto
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Middleware per verificare JWT
exports.verifyJWT = catchAsync(async (req, res, next) => {
  // 1) Getting token and Check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to access. ', 401),
    );
  }

  try {
    // 2) Verify the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.userId);

    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401,
        ),
      );
    }

    // Optionally, you can also check if the user changed their password after the token was issued
    // if (currentUser.changedPasswordAfter(decoded.iat)) {
    //   return next(new AppError('User recently changed password! Please log in again.', 401));
    // }

    // Grant access to protected route
    req.user = currentUser;
    next();
  } catch (err) {
    return next(new AppError('Invalid token. Please log in again.', 401));
  }
});
