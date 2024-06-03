const School = require('../models/groupModel');
//const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// exports.setUserIds = (req, res, next) => {
//   //Allow nested routes
//   if (!req.body.group) req.body.group = req.params.tourId;
//   if (!req.body.user) req.body.user = req.user.id;
//   next();
// };

exports.getAllGroup = factory.getAll(School);
exports.getGroup = factory.getOne(School);
// exports.createGroup = factory.createOne(School);
// exports.deleteGroup = factory.deleteOne(School);
// exports.updateGroup = factory.updateOne(School);
