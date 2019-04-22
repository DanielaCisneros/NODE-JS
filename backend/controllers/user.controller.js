const User = require('../models/user.model');
const Auth = require('../authentication/auth');

//CREATE
exports.createUser = (req, res) => {
    if (!req.body.name || !req.body.password) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }
    const user = new User({
        name: req.body.name || "Untitled user",
        password: Auth.encrypt(req.body.password) || "Untitled user"
    });
    user.save()
        .then(
            res.send("true")
        ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });
};

//FIND ONE GET
exports.login = (req, res) => {        
    if (!req.query.name || !req.query.password) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }
    User.aggregate([
        {
            $match: {name: req.query.name, password:Auth.encrypt(req.query.password)}
        },
        {
            $project: {
                _id: 1,
                name: 1
            }
        }
    ]).then(data => {
        if(data == null || data.length == 0){
            res.status(400).send({
                message:  "User and password not found"
            });
        }else{
            res.send(data);
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    }); 
};

/*
exports.ObtenerUsuarios = (req, res) => {
         User.find({         
        })
        .then(user => {
            res.send(user);

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
};
*/


//UPDATE
exports.updateUser = (req, res) => {
    if (!req.body.name || !req.body.password) {
        return res.status(400).send({
            message: "user content can not be empty"
        });
    }
    User.findByIdAndUpdate(req.params.userId, {
            name: req.body.name || "Untitled user",
            password: Auth.encrypt(req.body.password) || "Untitled user"
        }, {
            new: true
        })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id 1 " + req.params.user
                });
            }
            res.send("true");
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "user not found with id 2 " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error updating user with id 3 " + req.params.userId
            });
        });
};

//DELETE
exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            res.send("true");
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.userId
            });
        });
};