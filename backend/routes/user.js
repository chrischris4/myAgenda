const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

// Route pour créer un événement
router.post('/', userController.createUser);
router.post('/login', userController.login);

module.exports = router;
