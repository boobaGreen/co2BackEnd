const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  groupId: { type: String, required: [true, 'Report must belong to a Group.'] }, // String ID from Telegram

  // participants: { type: Number }, // Optional, remove if not needed

  totalMessages: { type: Number, required: true }, // Number of messages

  totalSizeKB: {
    type: Number,
    required: true,
  },

  emissionsOneByteMethod: { type: Number },
  emissionsSWDMethod: { type: Number },

  timestamp: { type: Date, default: Date.now, required: true }, // Timestamp of the report
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
