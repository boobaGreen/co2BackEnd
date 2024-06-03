const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  // type: 'supergroup',
  participants: {
    type: Number,
    default: 2,
  },
  co2TotalGrams: {
    type: Number,
    default: 0,
  },
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
