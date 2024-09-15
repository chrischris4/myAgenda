const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const auth = require('../middleware/auth'); // Assurez-vous d'utiliser votre middleware d'auth
const multerConfig = require('../middleware/multer');

// Route pour créer un événement
router.post('/', multerConfig, userController.createUser);
router.post('/login', userController.login);
router.get('/pseudo', auth, userController.getUserPseudo);
router.put('/:id', auth, userController.updateUser);

module.exports = router;
