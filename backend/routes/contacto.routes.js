module.exports = (app) => {
    const contacto = require('../controllers/contacto.controller');

    app.get('/contacto/:nombre', contacto.buscar);

}