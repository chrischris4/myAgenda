const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
});

module.exports = mongoose.model('Event', eventSchema);
