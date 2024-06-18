const mongoose = require('mongoose');
const donationSchema = require('./donationModel'); // Import the donation schema

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
    type: [String], // Array of strings representing admin usernames
    default: [],
    comment: 'List of usernames with admin privileges for the group',
  },
  totalDonations: {
    type: [donationSchema], // Array of donation documents based on the donation schema
    default: [],
    comment: 'Array of donation records for the group',
  },
  limits: {
    hour: {
      type: Number,
      default: -1,
      comment: 'limit for 1 hour traffic in kb : -1 for NO LIMIT',
    },
    day: {
      type: Number,
      default: -1,
      comment: 'limit for 1 day traffic in kb : -1 for NO LIMIT',
    },
    week: {
      type: Number,
      default: -1,
      comment: 'limit for 1 week traffic in kb : -1 for NO LIMIT',
    },
    month: {
      type: Number,
      default: -1,
      comment: 'limit for 1 month traffic in kb : -1 for NO LIMIT',
    },
    year: {
      type: Number,
      default: -1,
      comment: 'limit for 1 year traffic in kb : -1 for NO LIMIT',
    },
  },
  lastReportLimitsCounter: {
    hour: {
      type: Number,
      default: 0,
      comment: 'counter for 1 hour limit in kb',
    },
    day: {
      type: Number,
      default: 0,
      comment: 'counter for 1 day limit in kb',
    },
    week: {
      type: Number,
      default: 0,
      comment: 'counter for 1 week limit in kb',
    },
    month: {
      type: Number,
      default: 0,
      comment: 'counter for 1 month limit in kb',
    },
    year: {
      type: Number,
      default: 0,
      comment: 'counter for 1 year limit in kb',
    },
  },
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
