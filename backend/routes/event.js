const express = require('express');
const router = express.Router();
const eventController = require('../controller/event');

// Route pour créer un événement
router.post('/', eventController.createEvent);
router.get('/', eventController.getEvents);
router.delete('/:id', eventController.deleteEvent);
router.put('/:id', eventController.updateEvent);

module.exports = router;
