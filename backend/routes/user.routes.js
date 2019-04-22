module.exports = (app) => {
    const users = require('../controllers/user.controller');

    app.post('/user', users.createUser);

    app.get('/user', users.login);
    //app.get('/users', users.ObtenerUsuarios);
    app.put('/user/:userId', users.updateUser);
    app.delete('/user/:userId', users.deleteUser);

}