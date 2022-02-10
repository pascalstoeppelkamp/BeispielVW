const mongoose = require("mongoose");
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    },
    role: {
        type: String,
        enum: ['user', 'verwalter'],
        default: 'user',
        required: true
    },
    Beruf: {
        type: String,
        enum: ['Schüler', 'Student', 'Sonstiges'],
        default: 'Sonstiges',
        required: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
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
});

// Encrypt password using bcrypt
VereinsmitgieldSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
VereinsmitgieldSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Match user entered password to hashed password in database
VereinsmitgieldSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Vereinsmitglied', VereinsmitgieldSchema)