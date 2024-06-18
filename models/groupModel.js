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
    type: {
      hour: { type: Number, default: -1 }, // Default per property "-1" means :NO LIMIT
      day: { type: Number, default: -1 },
      week: { type: Number, default: -1 },
      month: { type: Number, default: -1 },
      year: { type: Number, default: -1 },
    },
  },
  lastReportLimitsCounter: {
    type: {
      hour: { type: Number, default: 0 }, // Default per property 0 to start counters
      day: { type: Number, default: 0 },
      week: { type: Number, default: 0 },
      month: { type: Number, default: 0 },
      year: { type: Number, default: 0 },
    },
  },
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
