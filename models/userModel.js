const mongoose = require('mongoose');

// Schema dell'utente
const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: [true, 'User must have an ID.'] },
  userName: { type: String },
  displayName: { type: String },
  status: { type: String, default: 'Active' }, // Impostato di default su "Active" per gli utenti Telegram
  createdAt: { type: Date, default: Date.now() }, // Data di creazione dell'utente
});

const User = mongoose.model('User', userSchema);

module.exports = User;
