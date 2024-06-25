const Donation = require('../models/donationModel');
//const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// exports.setUserIds = (req, res, next) => {
//   //Allow nested routes
//   if (!req.body.group) req.body.group = req.params.tourId;
//   if (!req.body.user) req.body.user = req.user.id;
//   next();
// };

exports.getAllDonation = factory.getAll(Donation);
exports.getDonation = factory.getOne(Donation);
exports.createDonation = factory.createOne(Donation);
// exports.deleteGroup = factory.deleteOne(School);
// exports.updateGroup = factory.updateOne(School);
