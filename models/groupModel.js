const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  // Unique identifier for the group
  groupId: {
    type: String,
    required: true,
    unique: true,
    comment: 'Unique ID from Telegram',
  },

  // Name of the group
  groupName: { type: String, required: true, comment: 'Name of the group' },

  // Number of participants in the group
  participantsCount: {
    type: Number,
    required: true,
    comment: 'Number of participants in the group',
  },

  // Array of reports associated with the group
  reports: [
    {
      // Report data fields
      messages: [
        // Message data
        {
          // Message content and other relevant fields
        },
      ],
      sizeKB: { type: Number, comment: 'Size of the report in KB' },
      emissionsOneByteMethod: {
        type: Number,
        comment: 'CO2 emissions using One Byte Method',
      },
      emissionsSWDMethod: {
        type: Number,
        comment: 'CO2 emissions using SWD Method',
      },
    },
  ],

  // Virtual fields (calculated directly within the schema)
  totalMessages: {
    type: Number,
    virtual: true,
    get() {
      return this.reports.reduce(
        (total, report) => total + report.messages.length,
        0,
      );
    },
    comment: 'Total number of messages across all reports for the group',
  },

  totalSizeKB: {
    type: Number,
    virtual: true,
    get() {
      return this.reports.reduce((total, report) => total + report.sizeKB, 0);
    },
    comment: 'Total size in KB of all reports for the group',
  },

  emissionsOneByteMethod: {
    type: Number,
    virtual: true,
    get() {
      return this.reports.reduce(
        (totalEmissions, report) =>
          totalEmissions + report.emissionsOneByteMethod,
        0,
      );
    },
    comment:
      'Total emissions (One Byte Method) across all reports for the group',
  },

  emissionsSWDMethod: {
    type: Number,
    virtual: true,
    get() {
      return this.reports.reduce(
        (totalEmissions, report) => totalEmissions + report.emissionsSWDMethod,
        0,
      );
    },
    comment: 'Total emissions (SWD Method) across all reports for the group',
  },

  // Timestamp of the most recent report for the group
  lastReportTimestamp: {
    type: Date,
    default: Date.now,
    comment: 'Timestamp of the most recent report for the group',
  },

  // Array of donation records
  donations: [
    {
      userId: { type: String, comment: 'Unique identifier for the donor' },
      amount: { type: Number, comment: 'Donation amount' },
      timestamp: {
        type: Date,
        default: Date.now,
        comment: 'Timestamp of the donation',
      },
    },
  ],

  // Average CO2 emissions per message using the SWD Method
  averageSWDEmissionsPerMessage: {
    type: Number,
    virtual: true,
    get() {
      // Calculate the average SWD emissions per message using existing fields
      return this.emissionsSWDMethod / this.totalMessages;
    },
    comment: 'Average CO2 emissions per message using the SWD Method',
  },

  // Average CO2 emissions per message using the One-Byte Method
  averageOneByteEmissionsPerMessage: {
    type: Number,
    virtual: true,
    get() {
      // Calculate the average One-Byte emissions per message using existing fields
      return this.emissionsOneByteMethod / this.totalMessages;
    },
    comment: 'Average CO2 emissions per message using the One-Byte Method',
  },
  averageMessageWeight: {
    type: Number,
    virtual: true,
    get() {
      // Check if there are any messages before division
      if (this.totalMessages === 0) {
        return 0;
      }

      // Calculate total weight using array methods (assuming a `weight` field in each message)
      const totalWeight = this.reports.reduce(
        (acc, report) =>
          acc +
          report.messages.reduce(
            (messageAcc, message) => messageAcc + message.weight,
            0,
          ),
        0,
      );

      return totalWeight / this.totalMessages;
    },
    comment: 'Average weight of a message across all reports for the group',
  },
});

module.exports = groupSchema;
