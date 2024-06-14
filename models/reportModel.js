const mongoose = require('mongoose');
const moment = require('moment-timezone');

// Configura il fuso orario predefinito
moment.tz.setDefault('UTC');

// Schema del report
const reportSchema = new mongoose.Schema({
  groupId: { type: String, required: [true, 'Report must belong to a Group.'] },
  groupName: { type: String },
  participantsCount: { type: Number },
  totalMessages: {
    type: Number,
    required: [true, 'Report must have a total message'],
  },
  totalSizeKB: {
    type: Number,
    required: [true, 'Report must have a total kb'],
  },
  emissionsOneByteMethod: { type: Number },
  emissionsSWDMethod: { type: Number },
  timestamp: {
    type: Date,
    default: () => moment().toDate(), // Usa moment per garantire UTC
    required: true,
  },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;

// Funzione per creare un report
const createReport = async (data) => {
  try {
    const report = new Report({
      groupId: data.groupId,
      groupName: data.groupName,
      participantsCount: data.participantsCount,
      totalMessages: data.totalMessages,
      totalSizeKB: data.totalSizeKB,
      emissionsOneByteMethod: data.emissionsOneByteMethod,
      emissionsSWDMethod: data.emissionsSWDMethod,
      timestamp: moment().toDate(), // Usa moment per garantire UTC
    });
    await report.save();
    console.log('Report saved successfully:', report);
  } catch (error) {
    console.error('Error saving report:', error);
  }
};

// Esempio di utilizzo
createReport({
  groupId: '123456',
  groupName: 'Test Group',
  participantsCount: 100,
  totalMessages: 50,
  totalSizeKB: 123.45,
  emissionsOneByteMethod: 0.1234567,
  emissionsSWDMethod: 0.2345678,
});
