const mongoose = require("mongoose");

const KontoSchema = new mongoose.Schema({
    Name: {
        type: String,
        trim: true,
        required: [true, 'Bitte geben Sie Ihren Namen ein.']
    },
    IBAN: {
        type: Number,
        trim: true,
        required: [true, 'Bitte geben Sie Ihre IBAN ein.']
    },
    vereinsmitglied: {
        type: mongoose.Schema.ObjectId,
        ref: 'Vereinsmitglied',
        required: true
    }
});


module.exports = mongoose.model('Konto', KontoSchema)