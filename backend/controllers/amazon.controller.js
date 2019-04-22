const Amazon = require('../models/amazon.model');

exports.amazon = (req, res) => {
    console.log('dhfkhsfbdsmbfkhsd4551456*************************************************');
    console.log(req);
    var events = new Amazon({
        body: req.body
    })
    events.save()
        .then(
            res.send(200)
        )
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};

exports.buscar = (req, res) => {
    Amazon.find()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
}