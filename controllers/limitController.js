const axios = require('axios');
const Group = require('../models/groupModel'); // Assicurati che il percorso sia corretto

// Controller per creare un limite generico per il gruppo
exports.createLimitGeneric = async (req, res, next) => {
  try {
    const { chatId, limit } = req.body;
    if (!chatId || !limit) {
      return res.status(400).json({ error: 'chatId e limit sono richiesti.' });
    }

    // Aggiorna il limite generico nel bot
    const endpoint = `${process.env.BOT_API_URL}/groupLimitGeneric`;
    const response = await axios.post(endpoint, { chatId, limit });

    // Aggiorna il modello Group con il nuovo limite
    await Group.findOneAndUpdate(
      { groupId: chatId },
      { $addToSet: { limits: limit } }, // Aggiungi il limite se non è già presente
      { new: true, upsert: true }, // Crea un nuovo documento se non esiste
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Errore durante la creazione del limite generico:', error);
    next(error);
  }
};

// Controller per cancellare tutti i limiti generici per il gruppo
exports.deleteLimitGeneric = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    if (!chatId) {
      return res.status(400).json({ error: 'chatId è richiesto.' });
    }

    // Rimuovi i limiti generici dal bot
    const endpoint = `${process.env.BOT_API_URL}/groupLimitGeneric/${chatId}`;
    const response = await axios.delete(endpoint);

    // Rimuovi tutti i limiti dal modello Group
    await Group.findOneAndUpdate(
      { groupId: chatId },
      { $set: { limits: [] } }, // Rimuovi tutti i limiti
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(
      'Errore durante la cancellazione dei limiti generici:',
      error,
    );
    next(error);
  }
};
