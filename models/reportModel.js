const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  groupId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Group',
    required: [true, 'Report must belong to a Group.'],
  }, // ID del gruppo Telegram

  participants: { type: Number }, // Numero di partecipanti nel gruppo
  totalMessages: { type: Number, required: true }, // Numero totale di messaggi inviati nell'ultima ora
  totalSizeBytes: { type: Number, required: true }, // Dimensione totale dei messaggi inviati nell'ultima ora in byte
  totalCO2: { type: Number, required: true }, // Emissioni totali di CO2 generate nell'ultima ora in grammi
  timestamp: { type: Date, default: Date.now, required: true }, // Timestamp del report
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
