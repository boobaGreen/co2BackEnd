const Donation = require('../models/groupModel');
//const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// exports.setUserIds = (req, res, next) => {
//   //Allow nested routes
//   if (!req.body.group) req.body.group = req.params.tourId;
//   if (!req.body.user) req.body.user = req.user.id;
//   next();
// };

exports.getAllGroup = factory.getAll(Donation);
exports.getGroup = factory.getOne(Donation);
exports.createGroup = factory.createOne(Donation);
// exports.deleteGroup = factory.deleteOne(School);
// exports.updateGroup = factory.updateOne(School);
