const mongoose = require('mongoose');
const materiaShema = require('./Materia');

const Schema = mongoose.Schema;

const estudianteModel = new Schema({
    nombre: String,
    apellido: String,
    cedula: String,
    materia: [materiaShema]
});

module.exports = mongoose.model("Estudiante", estudianteModel);