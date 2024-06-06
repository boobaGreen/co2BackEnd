const mongoose = require('mongoose');
const http = require('http');
const dotenv = require('dotenv');
const axios = require('axios');

const { app } = require('./app');

dotenv.config({ path: './config.env' });

const DB =
  'mongodb+srv://devboobagreen:QxJJgyTcZSR9Rd8b@co2telegram.hiwspma.mongodb.net/?retryWrites=true&w=majority&appName=Co2Telegram';

async function updateWhitelist() {
  try {
    // Ottieni l'IP corrente
    const response = await axios.get('https://api.ipify.org?format=json');
    const currentIP = response.data.ip;

    // API URL e credenziali per MongoDB Atlas
    const atlasUrl = `https://cloud.mongodb.com/api/atlas/v1.0/groups/${process.env.ATLAS_PROJECT_ID}/accessList`;
    const atlasUser = process.env.ATLAS_API_USER;
    const atlasKey = process.env.ATLAS_API_KEY;

    // Aggiungi il nuovo IP alla whitelist
    const newIP = { ipAddress: currentIP };
    const result = await axios.post(atlasUrl, newIP, {
      auth: {
        username: atlasUser,
        password: atlasKey,
      },
      headers: { 'Content-Type': 'application/json' },
    });

    if (result.status === 201) {
      console.log('IP aggiunto alla whitelist con successo!');
    } else {
      console.error(
        "Errore nell'aggiungere IP alla whitelist:",
        result.status,
        result.data,
      );
    }
  } catch (error) {
    console.error(
      "Errore nell'ottenere l'IP corrente o nell'aggiornare la whitelist:",
      error.message,
    );
  }
}

async function dbConnect() {
  await updateWhitelist();

  try {
    await mongoose.connect(DB);
    console.log('Connected to the database!');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
}

dbConnect();

const port = process.env.PORT || 5000;

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
