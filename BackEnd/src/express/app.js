'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//---- CORDS-----
const cors = require('cors');
app.use(cors());
const allowedOrigins = [
    'http://localhost',
    'http://localhost:4200',
    'localhost:4200',
];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS'));
        }
    },
};
app.options('*', cors(corsOptions)); // fin cords

//configuramos el middleware para el formato
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()) //lo que me llegue lo convierto en json


//archivos de ruta
const routing = require('../services/routing');

app.use('/api', routing);

module.exports = app;