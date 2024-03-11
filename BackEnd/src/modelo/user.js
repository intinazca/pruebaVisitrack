'use strict'
// nuestro modelo de datos de la db

var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
});

//a la coleccion de la db, le mandamos los datos de usuarioSchema
module.exports = mongoose.model('User', userSchema); 