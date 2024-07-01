const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true,
    unique: true,
    comment: 'Unique ID from Telegram',
  },
  groupName: {
    type: String,
    required: true,
    comment: 'Name of the group',
  },
  participantsCount: {
    type: Number,
    required: true,
    comment: 'Number of participants in the group',
  },
  totalMessages: {
    type: Number,
    default: 0,
    comment: 'Total number of messages across all reports for the group',
  },
  totalSizeKB: {
    type: Number,
    default: 0,
    comment: 'Total size in KB of all reports for the group',
  },
  totalEmissionsOneByte: {
    type: Number,
    default: 0,
    comment:
      'Total emissions (One Byte Method) across all reports for the group',
  },
  totalEmissionsSWD: {
    type: Number,
    default: 0,
    comment: 'Total emissions (SWD Method) across all reports for the group',
  },
  lastReportTimestamp: {
    type: Date,
    default: Date.now,
    comment: 'Timestamp of the most recent report for the group',
  },
  adminNames: {
    type: [String],
    default: [],
    comment: 'List of usernames with admin privileges for the group',
  },
  donations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donation',
      comment: 'References to donations made by the group members',
    },
  ],
  groupLimits: {
    type: Number,
    default: -1,
    comment:
      'References to the limits set by the group admins in KB for each message',
  },
  textTotalMessages: { type: Number, default: 0 },
  textTotalSize: { type: Number, default: 0 },
  textEmissionsOneByteMethod: { type: Number, default: 0 },
  textEmissionsSWDMethod: { type: Number, default: 0 },
  photoTotalMessages: { type: Number, default: 0 },
  photoTotalSize: { type: Number, default: 0 },
  photoEmissionsOneByteMethod: { type: Number, default: 0 },
  photoEmissionsSWDMethod: { type: Number, default: 0 },
  voiceTotalMessages: { type: Number, default: 0 },
  voiceTotalSize: { type: Number, default: 0 },
  voiceEmissionsOneByteMethod: { type: Number, default: 0 },
  voiceEmissionsSWDMethod: { type: Number, default: 0 },
  videoTotalMessages: { type: Number, default: 0 },
  videoTotalSize: { type: Number, default: 0 },
  videoEmissionsOneByteMethod: { type: Number, default: 0 },
  videoEmissionsSWDMethod: { type: Number, default: 0 },
  documentTotalMessages: { type: Number, default: 0 },
  documentTotalSize: { type: Number, default: 0 },
  documentEmissionsOneByteMethod: { type: Number, default: 0 },
  documentEmissionsSWDMethod: { type: Number, default: 0 },
  pollTotalMessages: { type: Number, default: 0 },
  pollTotalSize: { type: Number, default: 0 },
  pollEmissionsOneByteMethod: { type: Number, default: 0 },
  pollEmissionsSWDMethod: { type: Number, default: 0 },
  stickerTotalMessages: { type: Number, default: 0 },
  stickerTotalSize: { type: Number, default: 0 },
  stickerEmissionsOneByteMethod: { type: Number, default: 0 },
  stickerEmissionsSWDMethod: { type: Number, default: 0 },
});

module.exports = mongoose.model('Group', groupSchema);
