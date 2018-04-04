const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const materiaSchema = new Schema({
    cod: String,
    nombre: String,
    docente: String,
    creditos: Number,
    nota: {
        type: Number,
        Min: 1,
        Max: 10,
        default: 1 
    }
});

module.exports = mongoose.model("Materia", materiaSchema);