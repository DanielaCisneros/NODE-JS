module.exports = (app) => {
    const amazon = require('../controllers/amazon.controller');

    app.post('/amazon', amazon.amazon);
    app.get('/amazon', amazon.buscar);

}