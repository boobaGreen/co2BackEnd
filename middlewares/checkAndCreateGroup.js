// middlewares/checkAndCreateGroup.js
const Group = require('../models/groupModel'); // Assumendo che tu abbia un modello Group

const checkAndCreateGroup = async (req, res, next) => {
  try {
    const { groupId, groupName } = req.body; // Presumendo che groupId e groupName siano nel corpo della richiesta

    if (!groupId) {
      return res.status(400).json({
        status: 'fail',
        message: 'Group ID is required',
      });
    }

    // Cerca il gruppo per groupId
    let group = await Group.findOne({ groupId });

    if (!group) {
      // Creare il gruppo se non esiste
      group = await Group.create({ groupId, groupName });
    } else {
      // Aggiornare i dati del gruppo se esiste
      group.groupName = groupName;
      await group.save();
    }

    req.group = group; // Aggiungi il gruppo alla richiesta per usi futuri
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = checkAndCreateGroup;
