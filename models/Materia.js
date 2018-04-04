const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const materiaModel = new Schema({
    nombre: String,
    docente: String,
    nota: Number
});

module.exports = mongoose.model("Materia", materiaModel);