module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    app.post('/user', users.create);

    app.get('/user/find/:name', users.findAll);

    app.get('/user/:name', users.findOne);

    app.put('/user/:userId', users.update);

    app.delete('/user/:userId', users.delete);
}