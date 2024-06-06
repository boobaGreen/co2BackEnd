// File: server.js

const mongoose = require('mongoose');
const http = require('http');
const dotenv = require('dotenv');
const { writeToLogFile } = require('./utils/logger');
const { app } = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

async function dbConnect() {
  try {
    await mongoose.connect(DB);
    writeToLogFile('Connected to the database!');
  } catch (error) {
    writeToLogFile(`Database connection error: ${error.message}`);
    process.exit(1);
  }
}
dbConnect();

const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, () => {
  writeToLogFile(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  writeToLogFile(`UNHANDLED REJECTION! 💥${err.name} ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  writeToLogFile(
    `UNCAUGHT EXCEPTION! 💥${err.name} ${err.message} ${err.stack}`,
  );
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  writeToLogFile('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    writeToLogFile('Process terminated');
  });
});

module.exports = { app, server };
