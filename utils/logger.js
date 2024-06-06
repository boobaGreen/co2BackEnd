// File: utils/logger.js

const fs = require('fs');
const path = require('path');

const writeToLogFile = (message) => {
  const logFilePath = path.join(__dirname, '..', 'logs', 'server.log');
  fs.appendFileSync(logFilePath, `${new Date().toISOString()} - ${message}\n`);
};

module.exports = { writeToLogFile };
