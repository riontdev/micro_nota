const mongoose = require('mongoose');
const materiaShema = require('./MateriaModel').materiaShema

const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
    nombre: String,
    apellido: String,
    cedula: {
        type: String,
        unique: true
    },
    materias: [{ type: Schema.Types.ObjectId, ref: 'Materia' }]
});

module.exports = mongoose.model("Estudiante", estudianteSchema);