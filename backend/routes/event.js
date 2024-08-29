const express = require('express');
const router = express.Router();
const eventController = require('../controller/event');

// Route pour créer un événement
router.post('/', eventController.createEvent);

module.exports = router;
