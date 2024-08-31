const User = require('../models/user')


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
      
      res.status(201).json({ message: 'User créé avec succès', event: newUser });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
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
