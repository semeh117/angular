const mongoose = require('mongoose');

const auteurSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    nationalite: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Auteur', auteurSchema);