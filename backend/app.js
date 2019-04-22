'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//MIDDLEWARES
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE'); 
    next();
});

//CARGAR ARCHIVOS DE RUTAS (SE DEBE CARGAR LAS RUTAS DESPUES DE CABECERAS Y MIDDLEWARES)
require('./routes/user.routes')(app);
require('./routes/sendGrid.routes')(app);
require('./routes/condominio.routes')(app);
require('./routes/contacto.routes')(app);
require('./routes/amazon.routes')(app);

//RUTAS
app.get('/', (req, res, next) => {
    res.json({ "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes." });
});

module.exports = app;