const mongoose = require('mongoose');

//Mongoose usa esta opción para agregar automáticamente campos
const NoteSchema = mongoose.Schema({
    title: String,
    content: String
}, {
        timestamps: true
    });

module.exports = mongoose.model('Note', NoteSchema);