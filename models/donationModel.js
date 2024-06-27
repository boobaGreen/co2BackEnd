const mongoose = require('mongoose');
const Group = require('./groupModel');

const donationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    comment: 'User ID of the donor',
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: [true, 'A donation must have a group ID'],
    comment: 'Group ID of the donation',
  },
  units: {
    type: Number,
    required: [true, 'A donation must have a number of units'],
    comment: 'Number of units (trees)',
  },
  donationId: {
    type: String,
    required: [true, 'A donation must have a donation ID'],
    comment: 'ID of the donation',
  },
  paymentDate: {
    type: Date,
    required: [true, 'Donation must have a payment date'],
    default: Date.now,
    comment: 'Date and time of the payment',
  },
  amount: {
    type: Number,
    required: true,
    comment: 'Amount of the payment',
  },
  currency: {
    type: String,
    required: true,
    comment: 'Currency of the payment',
  },
  unitType: {
    type: String,
    default: 'tree',
    comment: 'Type of unit (e.g., tree)',
  },
  locationProject: {
    type: String,
    comment: 'Location of the project',
  },
  idProject: {
    type: String,
    comment: 'ID of the project',
  },
  nameProject: {
    type: String,
    comment: 'Name of the project',
  },
});

// Post-save middleware to update the group with the new donation
donationSchema.post('save', async (doc, next) => {
  try {
    await Group.findOneAndUpdate(
      { groupId: doc.groupId },
      { $push: { donations: doc._id } },
      { new: true, useFindAndModify: false },
    );
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Donation', donationSchema);
