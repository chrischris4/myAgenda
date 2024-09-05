const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    pseudo: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    picture: { type: String, required: false },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
