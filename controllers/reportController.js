const Report = require('../models/reportModel');
const factory = require('./handlerFactory');

// new version with factory file
exports.getAllReport = factory.getAll(Report);
exports.getReport = factory.getOne(Report);
exports.createReport = factory.createOne(Report);
// ps DONT update passwords with this
exports.updateReport = factory.updateOne(Report);
exports.deleteReport = factory.deleteOne(Report);
