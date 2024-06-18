const mongoose = require('mongoose');
// const donationSchema = require('./donationModel'); // Import the donation schema

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
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;

// totalMessages: {
//   type: Number,
//   default: 0,
//   comment: 'Total number of messages across all reports for the group',
// },
// totalSizeKB: {
//   type: Number,
//   default: 0,
//   comment: 'Total size in KB of all reports for the group',
// },
// totalEmissionsOneByte: {
//   type: Number,
//   default: 0,
//   comment:
//     'Total emissions (One Byte Method) across all reports for the group',
// },
// totalEmissionsSWD: {
//   type: Number,
//   default: 0,
//   comment: 'Total emissions (SWD Method) across all reports for the group',
// },
// lastReportTimestamp: {
//   type: Date,
//   default: Date.now,
//   comment: 'Timestamp of the most recent report for the group',
// },
// totalDonations: {
//   type: [donationSchema], // Array of donation documents based on the donation schema
//   default: [],
//   comment: 'Array of donation records for the group',
// },
// lastReportLimitsCounter: {
//   type: {
//     hour: { type: Number, default: 0 },
//     day: { type: Number, default: 0 },
//     week: { type: Number, default: 0 },
//     month: { type: Number, default: 0 },
//     year: { type: Number, default: 0 },
//   },
//   default: {
//     hour: 0,
//     day: 0,
//     week: 0,
//     month: 0,
//     year: 0,
//   },
//   comment: 'Last report limits counters for hour, day, week, month, and year',
// },
// lifetimeLimits: {
//   type: {
//     hour: { type: Number, default: -1 }, // -1 no limit , 0 max limit , 10 10kb limit 100 100 kb limit
//     day: { type: Number, default: -1 },
//     week: { type: Number, default: -1 },
//     month: { type: Number, default: -1 },
//     year: { type: Number, default: -1 },
//   },
//   default: {
//     hour: 0,
//     day: 0,
//     week: 0,
//     month: 0,
//     year: 0,
//   },
//   comment: 'Lifetime limits for hour, day, week, month, and year',
// },
