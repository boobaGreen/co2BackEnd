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
  emissionsOneByteMethod: {
    type: Number,
    required: [true, 'Report must have a total emissionsOneByteMethod'],
  },
  emissionsSWDMethod: {
    type: Number,
    required: [true, 'Report must have a total emissionsSWDMethod'],
  },
  textTotalMessages: {
    type: Number,
    required: [true, 'Report must have a total text messages'],
  },
  textTotalSize: {
    type: Number,
    required: [true, 'Report must have a total text kb'],
  },
  textEmissionsOneByteMethod: {
    type: Number,
    required: [true, 'Report must have a total text emissionsOneByteMethod'],
  },
  textEmissionsSWDMethod: {
    type: Number,
    required: [true, 'Report must have a total text emissionsSWDMethod'],
  },
  photoTotalMessages: {
    type: Number,
    required: [true, 'Report must have a total photo messages'],
  },
  photoTotalSize: {
    type: Number,
    required: [true, 'Report must have a total photo kb'],
  },
  photoEmissionsOneByteMethod: {
    type: Number,
    required: [true, 'Report must have a total photo emissionsOneByteMethod'],
  },
  photoEmissionsSWDMethod: {
    type: Number,
    required: [true, 'Report must have a total photo emissionsSWDMethod'],
  },
  voiceTotalMessages: {
    type: Number,
    required: [true, 'Report must have a total voice messages'],
  },
  voiceTotalSize: {
    type: Number,
    required: [true, 'Report must have a total voice kb'],
  },
  voiceEmissionsOneByteMethod: {
    type: Number,
    required: [true, 'Report must have a total voice emissionsOneByteMethod'],
  },
  voiceEmissionsSWDMethod: {
    type: Number,
    required: [true, 'Report must have a total voice emissionsSWDMethod'],
  },
  videoTotalMessages: {
    type: Number,
    required: [true, 'Report must have a total video messages'],
  },
  videoTotalSize: {
    type: Number,
    required: [true, 'Report must have a total video kb'],
  },
  videoEmissionsOneByteMethod: {
    type: Number,
    required: [true, 'Report must have a total video emissionsOneByteMethod'],
  },
  videoEmissionsSWDMethod: {
    type: Number,
    required: [true, 'Report must have a total video emissionsSWDMethod'],
  },
  documentTotalMessages: {
    type: Number,
    required: [true, 'Report must have a total document messages'],
  },
  documentTotalSize: {
    type: Number,
    required: [true, 'Report must have a total document kb'],
  },
  documentEmissionsOneByteMethod: {
    type: Number,
    required: [
      true,
      'Report must have a total document emissionsOneByteMethod',
    ],
  },
  documentEmissionsSWDMethod: {
    type: Number,
    required: [true, 'Report must have a total document emissionsSWDMethod'],
  },
  pollTotalMessages: {
    type: Number,
    required: [true, 'Report must have a total poll messages'],
  },
  pollTotalSize: {
    type: Number,
    required: [true, 'Report must have a total poll kb'],
  },
  pollEmissionsOneByteMethod: {
    type: Number,
    required: [true, 'Report must have a total poll emissionsOneByteMethod'],
  },
  pollEmissionsSWDMethod: {
    type: Number,
    required: [true, 'Report must have a total poll emissionsSWDMethod'],
  },
  stickerTotalMessages: {
    type: Number,
    required: [true, 'Report must have a total sticker messages'],
  },
  stickerTotalSize: {
    type: Number,
    required: [true, 'Report must have a total sticker kb'],
  },
  stickerEmissionsOneByteMethod: {
    type: Number,
    required: [true, 'Report must have a total sticker emissionsOneByteMethod'],
  },
  stickerEmissionsSWDMethod: {
    type: Number,
    required: [true, 'Report must have a total sticker emissionsSWDMethod'],
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
