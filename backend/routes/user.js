const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const auth = require('../middleware/auth'); // Assurez-vous d'utiliser votre middleware d'auth

// Route pour créer un événement
router.post('/', userController.createUser);
router.post('/login', userController.login);
router.get('/pseudo', auth, userController.getUserPseudo);

module.exports = router;
