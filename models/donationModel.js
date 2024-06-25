const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
    required: true,
    comment: 'Number of units (trees)',
  },
  code: {
    type: String,
    required: true,
    comment: 'Unique code associated with the donation',
  },
  project: {
    id: {
      type: String,
      comment: 'ID of the project',
    },
    name: {
      type: String,
      comment: 'Name of the project',
    },
    country: {
      type: String,
      comment: 'Country of the project',
    },
    purpose: {
      type: String,
      comment: 'Purpose of the project',
    },
  },
  donor: {
    firstname: {
      type: String,
      comment: 'First name of the donor',
    },
    lastname: {
      type: String,
      comment: 'Last name of the donor',
    },
    email: {
      type: String,
      comment: 'Email address of the donor',
    },
    address: {
      type: String,
      comment: 'Address of the donor',
    },
    city: {
      type: String,
      comment: 'City of the donor',
    },
    zipCode: {
      type: String,
      comment: 'ZIP code of the donor',
    },
    country: {
      type: String,
      comment: 'Country of the donor',
    },
    companyname: {
      type: String,
      comment: 'Company name of the donor (if applicable)',
    },
    tin: {
      type: String,
      comment: 'Tax identification number of the donor (if applicable)',
    },
  },
  destination: {
    id: {
      type: String,
      comment: 'ID of the destination',
    },
    type: {
      type: String,
      comment: 'Type of the destination',
    },
    country: {
      type: String,
      comment: 'Country of the destination',
    },
    currency: {
      type: String,
      comment: 'Currency of the destination',
    },
    purpose: {
      type: String,
      comment: 'Purpose of the destination',
    },
    name: {
      type: String,
      comment: 'Name of the destination',
    },
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
