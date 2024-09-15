require('dotenv').config();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// Configurer Multer pour stocker les fichiers dans un répertoire spécifique
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Dossier où les images seront stockées
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nom de fichier unique
    },
});

// Filtrer les fichiers pour n'accepter que les images
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file format'), false);
    }
};

// Initialiser l'upload avec la configuration
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limite de taille à 5MB
    fileFilter: fileFilter,
});
exports.createUser = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10);

        // Si une image est uploadée, créez l'URL pour l'image
        let imageUrl = null;
        if (req.file) {
            imageUrl = `${req.file.filename}`;
        }

        // Créer un nouvel utilisateur avec l'image et les autres infos
        const newUser = new User({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash,
            picture: imageUrl, // Enregistre l'URL de l'image
        });

        await newUser.save();

        res.status(201).json({
            message: 'Utilisateur créé avec succès',
            user: newUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res
                    .status(401)
                    .json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res
                            .status(401)
                            .json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN_SECRET,
                            {
                                expiresIn: '24h',
                            }
                        ),
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getUserPseudo = async (req, res) => {
    try {
        const userId = req.auth.userId; // Récupérer l'ID de l'utilisateur du middleware
        const user = await User.findById(userId); // Trouver l'utilisateur dans la base de données

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.json({
            pseudo: user.pseudo,
            image: user.picture, // Renvoie l'URL de l'image de l'utilisateur
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération de l'utilisateur",
            error,
        });
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.auth.userId; // Récupérer l'ID de l'utilisateur du middleware
    const user = await User.findById(userId); // Trouver l'utilisateur dans la base de données

    try {
        // Mettre à jour le user avec les nouvelles données
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { pseudo: req.body.pseudo }

            // Renvoie le user mis à jour
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User non trouvé' });
        }

        res.status(200).json({
            message: 'User mis à jour avec succès',
            event: updatedUser,
        });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du User:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

const checkUsers = async () => {
    try {
        // Recherchez tous les events dans la collection
        const users = await User.find({});
        // Affichez les events trouvés
        console.log(users);
    } catch (error) {
        console.error('Erreur lors de la vérification des users', error);
    }
};
checkUsers();

// (async () => {
//     try {
//         // Supprimez tous les jeux existants
//         await User.deleteMany({});
//         console.log('Tous les users existants ont été supprimés.');
//     } catch (error) {
//         console.error(
//             'Erreur lors de la suppression des users au démarrage:',
//             error
//         );
//     }
// })();
