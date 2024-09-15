const multer = require('multer');

// Types MIME pour les fichiers d'image
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
};

// Configuration de stockage
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads'); // Répertoire où les images seront stockées
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); // Remplacer les espaces par des underscores
        const extension = MIME_TYPES[file.mimetype]; // Obtenir l'extension basée sur le type MIME
        callback(null, name + Date.now() + '.' + extension); // Créer un nom de fichier unique
    },
});

// Exporter la configuration Multer
module.exports = multer({ storage: storage }).single('picture');
