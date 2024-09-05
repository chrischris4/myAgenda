const Event = require('../models/event');
exports.createEvent = async (req, res) => {
    try {
        const { date, title, description, userId } = req.body; // Récupérer userId des données de la requête

        const newEvent = new Event({
            date: new Date(date),
            title,
            description,
            userId, // Ajout de l'userId à l'événement
        });

        await newEvent.save();

        res.status(201).json({
            message: 'Event créé avec succès',
            event: newEvent,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getEvents = async (req, res) => {
    try {
        const { userId } = req.query; // Récupérer userId des paramètres de requête

        // Rechercher les événements associés à l'userId
        const events = await Event.find({ userId });

        // Retourner les événements sous forme de JSON
        res.status(200).json(events);
    } catch (error) {
        console.error('Erreur lors de la récupération des événements', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const checkEvents = async () => {
    try {
        // Recherchez tous les events dans la collection
        const events = await Event.find({});
        // Affichez les events trouvés
        console.log(events);
    } catch (error) {
        console.error('Erreur lors de la vérification des events', error);
    }
};
checkEvents();

// (async () => {
//     try {
//         // Supprimez tous les event existants
//         await Event.deleteMany({});
//         console.log('Tous les event existants ont été supprimés.');
//     } catch (error) {
//         console.error(
//             'Erreur lors de la suppression des event au démarrage:',
//             error
//         );
//     }
// })();
