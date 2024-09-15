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

exports.updateEvent = async (req, res) => {
    const eventId = req.params.id; // Récupérer l'ID de l'événement à partir des paramètres
    const { date, title, description } = req.body; // Récupérer les champs à mettre à jour

    try {
        // Mettre à jour l'événement avec les nouvelles données
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { date: new Date(date), title, description }, // Les champs à mettre à jour
            { new: true, runValidators: true } // Renvoie l'événement mis à jour
        );

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Événement non trouvé' });
        }

        res.status(200).json({
            message: 'Événement mis à jour avec succès',
            event: updatedEvent,
        });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'événement:", error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

exports.deleteEvent = async (req, res) => {
    const eventId = req.params.id; // Récupérer l'ID de l'événement depuis les paramètres

    try {
        const result = await Event.findByIdAndDelete(eventId); // Suppression de l'événement

        if (result) {
            return res
                .status(200)
                .json({ message: 'Événement supprimé avec succès' });
        } else {
            return res.status(404).json({ message: 'Événement non trouvé' }); // 404 si l'événement n'existe pas
        }
    } catch (error) {
        console.error("Erreur lors de la suppression de l'événement:", error);
        return res.status(500).json({ message: 'Erreur serveur' }); // Gestion d'erreur
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
