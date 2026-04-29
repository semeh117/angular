const Auteur = require('../models/auteur.model');
//ajouter un auteur
exports.createAuteur = async (req, res) => {
    try {
        const nouveauAuteur = new Auteur(req.body);
        await nouveauAuteur.save();
        res.status(201).json(nouveauAuteur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
};
//afficher tous les auteurs
exports.getAllAuteurs = async (req, res) => {
    try {
        const auteurs = await Auteur.find();
        res.status(200).json(auteurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//afficher un auteur par id
exports.getAuteurById = async (req, res) => {
    try {
        const auteur = await Auteur.findById(req.params.id);    
        if (!auteur) {
            return res.status(404).json({ message: 'Auteur non trouvé' });
        }
        res.status(200).json(auteur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};
//mettre à jour un auteur
exports.updateAuteur = async (req, res) => {
    try {
        const auteur = await Auteur.findByIdAndUpdate(req.params.id
            , req.body, { new: true });
        if (!auteur) {
            return res.status(404).json({ message: 'Auteur non trouvé' });
        }
        res.status(200).json(auteur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
//supprimer un auteur
exports.deleteAuteur = async (req, res) => {    
    try {
        const auteur = await Auteur.findByIdAndDelete(req.params.id);
        if (!auteur) {
            return res.status(404).json({ message: 'Auteur non trouvé' });
        }
        res.status(200).json({ message: 'Auteur supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


