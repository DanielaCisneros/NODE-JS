const Sendgrid = require('../models/sendGrid.model');

exports.guardarDatos = (req, res) => {
    var events = req.body;
    events.forEach((event) => {
        const dataSendgrid = new Sendgrid({
            ip: event.ip,
            sg_user_id: event.sg_user_id,
            sg_event_id: event.sg_event_id,
            sg_message_id: event.sg_message_id,
            useragent: event.useragent,
            event: event.event,
            marketing_campaign_name: event.marketing_campaign_name,
            email: event.email,
            asm_group_id: event.asm_group_id,
            timestamp: event.timestamp,
            marketing_campaign_id: event.marketing_campaign_id,
            category: event.category
        })
        dataSendgrid.save()
            .catch(err => {
                res.send(500)
            });
    }
    );
    res.send(200)
};

exports.filtrarDatos = (req, res) => {
    if (req.params.estado != 'leido' && req.params.estado != 'rebote' && req.params.estado != 'entregado') {
        res.send("filtre su consulta por entregado, leido, rebote");
    }

    if (req.params.estado == 'entregado') {
        Sendgrid.aggregate([
            {
                $match: {
                    event: {
                        $in: ['processed', 'delivered', 'spamreport']
                    }
                }
            },
            {
                $lookup: {
                    from: 'contactos',
                    localField: 'email',   
                    foreignField: 'cotEmail', 
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
    if (req.params.estado == 'rebote') {
        if (req.body.tipo == null || (req.body.tipo != 'fuerte' && req.body.tipo != 'block' && req.body.tipo != 'debil')) {
            res.send("requerimiento tipo de rebote esta nulo o no esta bien especificado ");
        }
        if (req.body.tipo == 'debil') {
            Sendgrid.aggregate([
                {
                    $match: {
                        event: {
                            $in: ['deferred']
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'contactos',
                        localField: 'email',  
                        foreignField: 'cotEmail',  
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
        if (req.body.tipo == 'fuerte') {
            Sendgrid.aggregate([
                {
                    $match: {
                        event: {
                            $in: ['bounce']
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'contactos',
                        localField: 'email',    
                        foreignField: 'cotEmail',  
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
        if (req.body.tipo == 'block') {
            Sendgrid.aggregate([
                {
                    $match: {
                        event: {
                            $in: ['dropped']
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'contactos',
                        localField: 'email',   
                        foreignField: 'cotEmail',  
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
        if (req.params.estado == 'leido') {
            Sendgrid.aggregate([
                {
                    $match: {
                        event: {
                            $in: ['open', 'click', 'unsubscribe', 'group_unsubscribe', 'group_resubscribe']
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'contactos',
                        localField: 'email',   
                        foreignField: 'cotEmail',  
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
    }
}

exports.reportes = (req, res) => {
    Sendgrid.aggregate([
        {
            $group: {
                _id:  '$event',
                count: { $sum: 1 }
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