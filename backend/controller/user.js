const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createUser = async (req, res) => {
    try {
        const { pseudo, email, password, picture } = req.body;

        const newUser = new User({
            pseudo,
            email,
            password,
            picture,
        });

        await newUser.save();

        res.status(201).json({
            message: 'User créé avec succès',
            event: newUser,
        });
    } catch (error) {
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
