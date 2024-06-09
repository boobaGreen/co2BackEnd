const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  groupId: { type: String, required: [true, 'Report must belong to a Group.'] }, // String ID from Telegram
  groupName: {
    type: String,
  }, // Name of the group
  participantsCount: { type: Number }, // Optional, remove if not needed

  totalMessages: {
    type: Number,
    required: [true, 'Report must have a total message'],
  }, // Number of messages

  totalSizeKB: {
    type: Number,
    required: [true, 'Report must have a total kb'], // Total size in KB
  },

  emissionsOneByteMethod: { type: Number }, // grammi
  emissionsSWDMethod: { type: Number }, // grammi

  timestamp: { type: Date, default: Date.now, required: true }, // Timestamp of the report "2024-06-07T20:00:39.056Z
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
