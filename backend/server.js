const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
const mongoose = require("mongoose");

const eventRoutes = require("./routes/event");



// Middleware pour parsing JSON
app.use(express.json());

app.use(cors());



// Connection a la base de données
mongoose
  .connect(
    `mongodb+srv://chris4:chris4Z-@myagenda.eoku4.mongodb.net/?retryWrites=true&w=majority&appName=myAgenda
`,
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));



// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.use("/api/events", eventRoutes);
