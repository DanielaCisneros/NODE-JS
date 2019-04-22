'use strict'

// CODIGO PARA REALIZAR CONEXION A LA BASE DE DATOS DE MONGO
var mongoose = require('mongoose');

// SE IMPORTAN LOS DATOS DEL SERVIDOR APP EXPRESS INCLUIDO LOS PUERTOS DE FUNCIONAMIENTO
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/apiscontrol', { useNewUrlParser: true })
                .then(() => {
                    console.log('Conexión a la base de datos realizada');
                    
                    //CREACION DE SERVIDOR => CONECTADO CON EL ARCHIVO APP.JS
                    app.listen(port,()=>{
                        console.log("Servidor corriendo correctament en URL: localhost:3700");
                    });

                }).catch((err) => {
                    console.log(err);
                });