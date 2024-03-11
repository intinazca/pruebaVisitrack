const express = require('express');
const routing = express.Router();
const controller = require('./controler');

//rutas
routing.post('/post', controller.post); //registro usuario
routing.get('/get', controller.get); //consultar todos los usuarios
routing.put('/put/:id', controller.put); //editar a un usuario en especifico
routing.delete('/delete/:id', controller.delete); //eliminar a un usuario en especifico

module.exports = routing;