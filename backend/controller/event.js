const Event = require("../models/event");

exports.createEvent = async (req, res) => {
    try {
        const { date, title, description } = req.body;

        const newEvent = new Event({
            date,
            title,
            description,
        });

        await newEvent.save();

        res.status(201).json({ message: 'Event créé avec succès', event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
