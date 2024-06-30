const mongoose = require('mongoose');

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
  textTotalMessages: {
    type: Number,
    required: true,
  },
  textTotalSize: {
    type: Number,
    required: true,
  },
  textEmissionsOneByteMethod: {
    type: Number,
    required: true,
  },
  textEmissionsSWDMethod: {
    type: Number,
    required: true,
  },
  photoTotalMessages: {
    type: Number,
    required: true,
  },
  photoTotalSize: {
    type: Number,
    required: true,
  },
  photoEmissionsOneByteMethod: {
    type: Number,
    required: true,
  },
  photoEmissionsSWDMethod: {
    type: Number,
    required: true,
  },
  voiceTotalMessages: {
    type: Number,
    required: true,
  },
  voiceTotalSize: {
    type: Number,
    required: true,
  },
  voiceEmissionsOneByteMethod: {
    type: Number,
    required: true,
  },
  voiceEmissionsSWDMethod: {
    type: Number,
    required: true,
  },
  videoTotalMessages: {
    type: Number,
    required: true,
  },
  videoTotalSize: {
    type: Number,
    required: true,
  },
  videoEmissionsOneByteMethod: {
    type: Number,
    required: true,
  },
  videoEmissionsSWDMethod: {
    type: Number,
    required: true,
  },
  documentTotalMessages: {
    type: Number,
    required: true,
  },
  documentTotalSize: {
    type: Number,
    required: true,
  },
  documentEmissionsOneByteMethod: {
    type: Number,
    required: true,
  },
  documentEmissionsSWDMethod: {
    type: Number,
    required: true,
  },
  pollTotalMessages: {
    type: Number,
    required: true,
  },
  pollTotalSize: {
    type: Number,
    required: true,
  },
  pollEmissionsOneByteMethod: {
    type: Number,
    required: true,
  },
  pollEmissionsSWDMethod: {
    type: Number,
    required: true,
  },
  stickerTotalMessages: {
    type: Number,
    required: true,
  },
  stickerTotalSize: {
    type: Number,
    required: true,
  },
  stickerEmissionsOneByteMethod: {
    type: Number,
    required: true,
  },
  stickerEmissionsSWDMethod: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now, // Usa moment per garantire UTC
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
