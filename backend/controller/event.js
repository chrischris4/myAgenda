const Event = require('../models/event');

exports.createEvent = async (req, res) => {
    try {
        const { date, title, description } = req.body;

        // Convertir la date en type Date si nécessaire
        const newEvent = new Event({
            date: new Date(date),
            title,
            description,
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
