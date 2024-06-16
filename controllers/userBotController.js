const axios = require('axios');

exports.getDetailGroups = async (req, res, next) => {
  try {
    // Ottenere l'ID dell'utente dal query parameter
    const { userId } = req.query;

    // Chiamata al backend per ottenere i gruppi dell'utente
    const response = await axios.get(
      `http://localhost:3000/api/getUserGroups?userId=${userId}`,
    );

    // Dati dei gruppi dell'utente ottenuti dalla chiamata al backend
    const userGroups = response.data;

    // Array per memorizzare i dettagli dei gruppi dell'utente (member o admin)
    const userGroupsDetails = [];

    // Itera sui gruppi ottenuti e determina se l'utente è member o admin
    userGroups.forEach((group) => {
      let role = 'member'; // Ruolo predefinito è member

      // Verifica se l'utente è admin del gruppo
      if (group.admins.includes(userId)) {
        role = 'admin';
      }

      // Aggiungi dettagli del gruppo all'array
      userGroupsDetails.push({
        groupId: group.id,
        groupName: group.name,
        role: role,
      });
    });

    // Costruire l'oggetto di risposta da inviare al frontend
    const report = {
      status: 'success',
      data: userGroupsDetails, // Includi i dettagli dei gruppi dell'utente
      requestedAt: req.requestTime, // Timestamp della richiesta
    };

    // Console log per i dettagli dei gruppi prima di inviare la risposta
    console.log("Dettagli dei gruppi dell'utente:", userGroupsDetails);

    // Invia la risposta al frontend
    res.status(200).json(report);
  } catch (error) {
    console.error('Errore durante il recupero dei gruppi utente:', error);
    res.status(500).json({
      status: 'error',
      message: 'Errore durante il recupero dei gruppi utente',
    });
  }
};
