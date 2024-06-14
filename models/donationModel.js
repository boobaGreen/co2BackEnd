const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true,
    comment: 'Name of the donor',
  },
  treesPlanted: {
    type: Number,
    required: true,
    comment: 'Number of trees planted as a result of the donation',
  },
  donationDate: {
    type: Date,
    default: Date.now,
    comment: 'Date of the donation',
  },
  donationAmountEUR: {
    type: Number,
    required: true,
    comment: 'Amount donated in Euros',
  },
  co2Equivalent: {
    type: Number,
    required: true,
    comment: 'CO2 equivalent reduction achieved by the donation',
  },
});

module.exports = donationSchema;
