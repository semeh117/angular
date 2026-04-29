const Livre = require('../models/livre.model.js');
//ajouter un livre
exports.createLivre = async (req, res) => {
    try {
        const nouveauLivre = new Livre(req.body);
        await nouveauLivre.save();
        res.status(201).json(nouveauLivre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
//afficher tous les livres
exports.getAllLivres = async (req, res) => {    
    try {
        const livres = await Livre.find().populate('auteur');
        res.status(200).json(livres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Mettre à jour un livre
exports.updateLivre = async (req, res) => {
    try {
        const LivreMiseAJour = await Livre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!LivreMiseAJour) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.status(200).json(LivreMiseAJour);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Supprimer un livre
exports.deleteLivre = async (req, res) => {
    try {
        const LivreSupprime = await Livre.findByIdAndDelete(req.params.id);
        if (!LivreSupprime) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.status(200).json({ message: 'Livre supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//afficher un livre par id
exports.getLivreById = async (req, res) => {
    try {
        const livre = await Livre.findById(req.params.id).populate('auteur');   
        if (!livre) {
            return res.status(404).json({ message: 'Livre non trouvé' });
        }
        res.status(200).json(livre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

