const mongoose = require('mongoose');

const CondominioSchema = mongoose.Schema({
    oid: String,
    codFechaLicencia: String,
    codActivo: String,
    codHabilitarNotificaciones: String,
    codEmail: String,
    codNombre: String,
    codDireccion: String,
    codRuc: String,
    codAdministrador: String,
    codLatitud: String,
    codSitioWeb: String,
    codLongitud: String,
    codNumeroUnidades: String
});

module.exports = mongoose.model('Condominio', CondominioSchema);

