const User = require('../models/user.model');
const Auth = require('../auth/cifrar')

exports.create = (req, res) => {
    if(!req.body.name && !req.body.password) {
        return res.status(400).send({
            message: "User name and password can not be empty"
        });
    }

    const user = new User({
        name: req.body.name || "Untitled User", 
        password: Auth.encrypt(req.body.password)
    });

    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

exports.findAll = (req, res) => {
    User.find({name: req.params.name})
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

exports.findOne = (req, res) => {
    User.findOne({name: req.params.name})
    .then(user => {
        console.log(req.params.name);
        if(!user) {
            return res.status(404).send({
                message: "User not found with name " + req.params.name
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with name " + req.params.name
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with name " + req.params.name
        });
    });
};

exports.update = (req, res) => {
    if(!req.body.user) {
        return res.status(400).send({
            message: "User name can not be empty"
        });
    }

    User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name || "Untitled user",
        password: req.body.password
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating User with id " + req.params.userId
        });
    });
};

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete User with id " + req.params.userId
        });
    });
};