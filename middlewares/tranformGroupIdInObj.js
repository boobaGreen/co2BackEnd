const Group = require('../models/groupModel');

exports.populateGroupReference = async (req, res, next) => {
  try {
    // Verifica se groupId è presente nella richiesta e se è una stringa
    if (req.body.groupId && typeof req.body.groupId === 'string') {
      // Cerca il documento Group con l'ID specificato
      const group = await Group.findOne({ groupId: req.body.groupId });

      // Se trovi il documento Group, aggiorna req.body.groupId con il riferimento ObjectId
      if (group) {
        req.body.groupId = group._id; // Assegna l'ID ObjectId del documento Group
      } else {
        // Se non trovi il documento Group, gestisci l'errore (puoi decidere come gestirlo)
        return res
          .status(404)
          .json({ status: 'error', message: 'Group not found' });
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
