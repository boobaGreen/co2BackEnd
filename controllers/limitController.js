const axios = require('axios');
const Group = require('../models/groupModel');
const User = require('../models/userModel');

exports.createLimitGeneric = async (req, res, next) => {
  try {
    const { chatId, limit } = req.body;
    const userId = req.user._id;

    if (!chatId || !limit) {
      return res.status(400).json({ error: 'chatId e limit sono richiesti.' });
    }

    // Ottieni l'username dell'utente utilizzando l'ID dell'utente
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { userName } = user;

    // Verifica se l'utente è un amministratore del gruppo
    const group = await Group.findOne({ groupId: chatId });
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    if (!group.adminNames.includes(userName)) {
      return res
        .status(403)
        .json({ error: 'User is not an admin of the group' });
    }

    // Aggiorna il limite generico nel bot
    const endpoint = `${process.env.BOT_API_URL}/groupLimitGeneric`;
    const response = await axios.post(endpoint, { chatId, limit });

    // Aggiorna il modello Group con il nuovo limite
    // eslint-disable-next-line no-unused-vars
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
    const userId = req.user._id;

    if (!chatId) {
      return res.status(400).json({ error: 'chatId è richiesto.' });
    }

    // Ottieni l'username dell'utente utilizzando l'ID dell'utente
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { userName } = user;

    // Verifica se l'utente è un amministratore del gruppo
    const group = await Group.findOne({ groupId: chatId });
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    if (!group.adminNames.includes(userName)) {
      return res
        .status(403)
        .json({ error: 'User is not an admin of the group' });
    }

    // Rimuovi il limite generico dal bot
    const endpoint = `${process.env.BOT_API_URL}/groupLimitGeneric/${chatId}`;
    const response = await axios.delete(endpoint);

    if (response.status === 200 || response.status === 204) {
      // Rimuovi il limite dal modello Group solo se l'operazione è andata a buon fine
      await Group.findOneAndUpdate(
        { groupId: chatId },
        { groupLimits: -1 }, // Assegna un valore di default per indicare l'assenza di limite
        { new: true }, // Ottieni il documento aggiornato
      );

      res
        .status(200)
        .json({ status: 'success', message: 'Limit deleted successfully' });
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
