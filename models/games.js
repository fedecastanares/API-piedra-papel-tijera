const { model, Schema } = require('mongoose')

module.exports = model('books', new Schema({
    idHost: {
        type: String,
        required: true,
        trim: true
    },
    idRivals: {
        type: String,
        required: true,
        trim: true
    },
    hostPlay: {
        type: String,
        required: true,
        trim: true
    },
    rivalsPlay: {
        type: String,
        required: true,
        trim: true
    },
    idWin: {
        type: String,
        required: true,
        trim: true
    },
    idLoose: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: {date: 'date'} }))