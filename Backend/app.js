const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connexion à la base de données
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // Pour parser le JSON
app.use(express.urlencoded({ extended: true }));

// Route de test
app.get('/', (req, res) => {
    res.send("Bienvenue sur l'API de Gestion de Bibliothèque");
});

const PORT = process.env.PORT || 3000;
// Importer les routes
const auteurRoutes = require('./routes/auteur.routes');
const livreRoutes = require('./routes/livre.routes');
// Utiliser les routes
app.use('/api/auteurs', auteurRoutes);
app.use('/api/livres', livreRoutes);
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});