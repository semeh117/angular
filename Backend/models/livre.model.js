const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    resume: { type: String },
    disponibilite: { type: Boolean, default: true }, // Affichage de la disponibilité requis
    auteur: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Auteur', // C'est ici que la liaison s'effectue
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Livre', livreSchema);