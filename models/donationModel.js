const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    comment: 'User ID of the donor',
  },
  groupId: {
    type: String,
    required: [true, 'a donation must have a group ID'],
    comment: 'User ID of the donor',
  },
  units: {
    type: Number,
    required: [true, 'a donation must have a number of units'],
    comment: 'Number of units (trees)',
  },
  donationId: {
    type: Number,
    required: [true, 'a donation must have a donation ID'],
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
    required: true,
    comment: 'Type of unit (e.g., tree)',
  },
});

module.exports = mongoose.model('Donation', donationSchema);
