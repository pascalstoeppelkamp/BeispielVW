const mongoose = require("mongoose");

const VereinsmitgieldSchema = new mongoose.Schema({
    Vorname: {
        type: String,
        required: [true, 'Bitte geben Sie einen Vornamen ein.'],
        trim: true
    },
    Nachname: {
        type: String,
        required: [true, 'Bitte geben Sie einen Nachnamen ein.'],
        trim: true
    },
    Email: {
        type: String,
        required: [true, 'Bitte geben Sie eine Email ein'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    Wohnort: {
        type: String,
        required: [true, 'Bitte geben Sie einen Wohnort an']
    },
    Tel_NR: {
        type: Number,
        required: false
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

VereinsmitgieldSchema.virtual('Konto', {
    ref: 'Konto',
    localField: '_id',
    foreignField: 'vereinsmitglied',
    justOne: false
})
module.exports = mongoose.model('Vereinsmitglied', VereinsmitgieldSchema)