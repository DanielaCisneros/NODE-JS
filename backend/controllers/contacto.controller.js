const Contacto = require('../models/contacto.model');
var request = require('request');
var cron = require('node-cron');

cron.schedule('0 0 03 * * MON', () => {
    console.log('cron si sirve 17 contacto');
    const options = {
        url: 'https://app.apiscondominios.com/web/wservices/data/contacts.do',
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
            data.forEach(contacto => {
                Contacto.findOneAndUpdate({ oid: contacto.oid }, {
                    $set: {
                        cotNombreApellido: contacto.cotNombreApellido,
                        cotFechaNace: contacto.cotFechaNace,
                        cotCedula: contacto.cotCedula,
                        cotCelular: contacto.cotCelular,
                        cotTelefono: contacto.cotTelefono,
                        cotEmail: contacto.cotEmail,
                        oid: contacto.oid,
                        cotTipoDocumento: contacto.cotTipoDocumento,
                        cotEmail2: contacto.cotEmail2
                    }
                }, { upsert: true }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while retrieving users."
                    });
                });
            });
        }
    });
});

exports.buscar = (req, res) => {
    Contacto.aggregate([
        {
            $match: { cotNombreApellido: req.params.nombre }
        },
        {
            $lookup: {
                from: 'condominios',
                localField: 'cotNombreApellido',   
                foreignField: 'codAdministrador',  
                as: 'condominios'
            }
        },
        {
            $lookup: {
                from: 'sendgrids',
                localField: 'cotEmail',   
                foreignField: 'email', 
                as: 'mensajes'
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