module.exports = (app) => {
    const sendGrid = require('../controllers/sendGrid.controller');

    app.post('/sendGrid', sendGrid.guardarDatos);
    app.get('/sendGrid/:estado', sendGrid.filtrarDatos);
    app.get('/sendGrid/reporte/count', sendGrid.reportes);
}