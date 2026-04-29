const express = require('express');
const router = express.Router();
const auteurController = require('../controllers/auteur.controller');

// Route pour ajouter un auteur
router.post('/', auteurController.createAuteur); 
// Route pour afficher tous les auteurs
router.get('/', auteurController.getAllAuteurs);
// Route pour afficher un auteur par id

module.exports = router;