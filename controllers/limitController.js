/* eslint-disable no-unused-vars */
const axios = require('axios');
const Group = require('../models/groupModel');
const isAdminMiddleware = require('../middlewares/isAdminMiddleware');

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
    const updatedGroup = await Group.findOneAndUpdate(
      { groupId: chatId },
      { groupLimits: limit }, // Assegna direttamente il nuovo limite come numero
      { new: true, upsert: true }, // Crea un nuovo documento se non esiste
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Errore durante la creazione del limite generico: ', error);
    next(error);
  }
};

exports.deleteLimitGeneric = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    console.log('Chat ID:', chatId);
    console.log('Request params:', req.params);
    if (!chatId) {
      return res.status(400).json({ error: 'chatId è richiesto.' });
    }

    // Rimuovi il limite generico dal bot
    const endpoint = `${process.env.BOT_API_URL}/groupLimitGeneric/${chatId}`;
    const response = await axios.delete(endpoint);

    // Verifica lo stato della risposta dal server di backend
    if (response.status === 204) {
      // Rimuovi il limite dal modello Group solo se l'operazione è andata a buon fine
      const updatedGroup = await Group.findOneAndUpdate(
        { groupId: chatId },
        { groupLimits: -1 }, // Assegna un valore di default per indicare l'assenza di limite
        { new: true }, // Ottieni il documento aggiornato
      );

      res.status(204).json({ status: 'success' });
    } else {
      // Se il server di backend non restituisce 204, gestisci l'errore di conseguenza
      res.status(response.status).json(response.data);
    }
  } catch (error) {
    console.error(
      'Errore durante la cancellazione del limite generico:',
      error,
    );
    next(error);
  }
};

module.exports = exports;
