const mongoose = require('mongoose');
const http = require('http');
const dotenv = require('dotenv');

const { app } = require('./app');

dotenv.config({ path: './config.env' });

const DB =
  'mongodb+srv://devboobagreen:QxJJgyTcZSR9Rd8b@co2telegram.hiwspma.mongodb.net/?retryWrites=true&w=majority&appName=Co2Telegram';

async function dbConnect() {
  try {
    await mongoose.connect(DB);
    console.log('Connected to the database!');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
}

dbConnect();

const port = process.env.PORT || 3005;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥', err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥', err.name, err.message, err.stack);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = { app, server };
