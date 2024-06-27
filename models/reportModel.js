const mongoose = require('mongoose');
const moment = require('moment-timezone');

// Configura il fuso orario predefinito
moment.tz.setDefault('UTC');

// Schema del report
const reportSchema = new mongoose.Schema({
  groupId: { type: String, required: [true, 'Report must belong to a Group.'] },
  groupName: { type: String },
  participantsCount: { type: Number },
  totalMessages: {
    type: Number,
    required: [true, 'Report must have a total message'],
  },
  totalSizeKB: {
    type: Number,
    required: [true, 'Report must have a total kb'],
  },
  emissionsOneByteMethod: { type: Number },
  emissionsSWDMethod: { type: Number },
  timestamp: {
    type: Date,
    default: () => moment().toDate(), // Usa moment per garantire UTC
    required: true,
  },
  adminNames: {
    type: [String],
    required: [true, 'Report must have at least one admin.'],
    validate: {
      validator: function (array) {
        return array.length > 0;
      },
      message: 'Report must have at least one admin.',
    },
  },
  groupReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
