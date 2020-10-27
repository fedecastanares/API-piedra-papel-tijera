const { model, Schema } = require('mongoose')

module.exports = model('games', new Schema({
    idHost: {
        type: String,
        required: true,
        trim: true
    },
    idRival: {
        type: String,
        required: true,
        trim: true
    },
    hostPlay: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    rivalPlay: {
        type: String,
        trim: true
    },
    idWin: {
        type: String,
        trim: true
    },
}, { timestamps: {date: 'date'} }))