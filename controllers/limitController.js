// limitController.js

const axios = require('axios');

// Controller per creare un limite generico per il gruppo
exports.createLimitGeneric = async (req, res, next) => {
  try {
    const { chatId, limit } = req.body;
    console.log('chatId', chatId);
    console.log('limit', limit);
    if (!chatId || !limit) {
      return res.status(400).json({ error: 'chatId e limit sono richiesti.' });
    }
    console.log('process.env.BOT_API_URL', process.env.BOT_API_URL);
    const endpoint = `${process.env.BOT_API_URL}/groupLimitGeneric`;
    const response = await axios.post(endpoint, { chatId, limit });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Errore durante la creazione del limite generico:', error);
    next(error);
  }
};

// Controller per creare un limite dettagliato per il gruppo
exports.createLimitDetailed = async (req, res, next) => {
  try {
    const { chatId, limitType } = req.body;

    if (!chatId || !limitType) {
      return res
        .status(400)
        .json({ error: 'chatId e limitType sono richiesti.' });
    }

    const endpoint = `${process.env.BOT_API_URL}/groupLimitDetailed`;
    const response = await axios.post(endpoint, { chatId, limitType });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Errore durante la creazione del limite dettagliato:', error);
    next(error);
  }
};

// Controller per cancellare un limite generico per il gruppo
exports.deleteLimitGeneric = async (req, res, next) => {
  try {
    const { chatId } = req.params;

    const endpoint = `${process.env.BOT_API_URL}/groupLimitGeneric/${chatId}`;
    const response = await axios.delete(endpoint);

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(
      'Errore durante la cancellazione del limite generico:',
      error,
    );
    next(error);
  }
};

// Controller per cancellare un limite dettagliato per il gruppo
exports.deleteLimitDetailed = async (req, res, next) => {
  try {
    const { chatId } = req.params;

    const endpoint = `${process.env.BOT_API_URL}/groupLimitDetailed/${chatId}`;
    const response = await axios.delete(endpoint);

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(
      'Errore durante la cancellazione del limite dettagliato:',
      error,
    );
    next(error);
  }
};
