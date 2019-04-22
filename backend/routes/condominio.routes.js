module.exports = (app) => {
    const condominio= require('../controllers/condominio.controller');

    app.get('/condominio/:nombre', condominio.buscar);

}