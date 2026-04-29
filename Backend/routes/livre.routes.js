const router = require('express').Router();
const livreController = require('../controllers/livre.controller');

// Route pour ajouter un livre
router.post('/', livreController.createLivre);

// Route pour afficher tous les livres
router.get('/', livreController.getAllLivres);        

// Route pour mettre à jour un livre
router.put('/:id', livreController.updateLivre);

// Route pour supprimer un livre
router.delete('/:id', livreController.deleteLivre);

module.exports = router;