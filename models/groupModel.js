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
  limits: [
    {
      type: Number,
      comment:
        'References to the limits set by the group admins in KB for each message',
    },
  ],
});

module.exports = mongoose.model('Group', groupSchema);
