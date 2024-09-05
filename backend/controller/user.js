const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        // Hash du mot de passe en utilisant await
        const hash = await bcrypt.hash(req.body.password, 10);

        // Création du nouvel utilisateur avec le mot de passe hashé
        const newUser = new User({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash, // Utilisation du mot de passe hashé
            picture: req.body.picture,
        });

        // Sauvegarde de l'utilisateur dans la base de données
        await newUser.save();

        // Réponse en cas de succès
        res.status(201).json({
            message: 'User créé avec succès',
            user: newUser, // Correction de 'event' en 'user'
        });
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
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

        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.json({ pseudo: user.pseudo }); // Renvoie le pseudo de l'utilisateur
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération de l'utilisateur",
            error,
        });
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
