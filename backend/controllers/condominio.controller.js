const Condominio = require('../models/condominio.model');
const request = require('request');
const cron = require('node-cron');

cron.schedule('0 0 03 * * MON', () => {
    console.log('cron si sirve 17 condominio');
    const options = {
        url: 'https://app.apiscondominios.com/web/wservices/data/condominio.do?active=true',
        method: 'GET',
        jar: true,
        headers: {
            'Authorization': 'LYxuu76Xnv6bOh6XeIxSPXEqbiLb87z0',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            data.forEach(condominio => {
                Condominio.findOneAndUpdate({ oid: condominio.oid }, {
                    $set: {
                        oid: condominio.oid,
                        codFechaLicencia: condominio.codFechaLicencia,
                        codActivo: condominio.codActivo,
                        codHabilitarNotificaciones: condominio.codHabilitarNotificaciones,
                        codEmail: condominio.codEmail,
                        codNombre: condominio.codNombre,
                        codDireccion: condominio.codDireccion,
                        codRuc: condominio.codRuc,
                        codAdministrador: condominio.codAdministrador,
                        codLatitud: condominio.codLatitud,
                        codSitioWeb: condominio.codSitioWeb,
                        codLongitud: condominio.codLongitud,
                        codNumeroUnidades: condominio.codNumeroUnidades
                    }
                }, { upsert: true }).catch(err => {
                    response.status(500).send({
                        message: err.message || "Some error occurred while retrieving users."
                    });
                });
            });
        }
    });
});

exports.buscar = (req, res) => {
    Condominio.aggregate([
        {
            $match: { codNombre: req.params.nombre }
        },
        {
            $lookup: {
                from: 'contactos',
                localField: 'codAdministrador',   
                foreignField: 'cotNombreApellido', 
                as: 'contacto'
            }
        }
    ]).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
}