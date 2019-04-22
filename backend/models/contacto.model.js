const mongoose = require('mongoose');

const ContactoSchema = mongoose.Schema({
    cotNombreApellido: String,
    cotFechaNace: String,
    cotCedula: String,
    cotCelular: String,
    cotTelefono: String,
    cotEmail: String,
    oid: String,
    cotTipoDocumento: String,
    cotEmail2: String
});

module.exports = mongoose.model('Contacto', ContactoSchema);