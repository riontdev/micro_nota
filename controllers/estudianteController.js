const Estudiante = require('./../models/EstudianteModel')
const Materia = require('../models/MateriaModel')
const util = require('util')

const isEmpty = obj => {
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
};

const get = (req, res) => {
    Estudiante.find((err, estudiante) => {
        if (err) {
            res.status(500);
            res.send("Error del servidor.");
        }
        else {
            res.status(200);
            res.send(estudiante);
        }
    });
};

const add = (req, res) => {
    const estudiante = new Estudiante(req.body);
    estudiante.save(err => {
        if (err) {
            res.status(500);
            res.send("Error al añadir.");
        }
        else {
            res.status(200);
            res.send(estudiante);
        }
    });
};

const del = (req, res) => {
    Estudiante.findById(req.params.id, (err, estudiante) => {
        if (err) {
            res.status(500);
            res.send("Error.");
        }
        else {
            estudiante.remove(err => {
                if (err) {
                    res.status(500);
                    res.send("Error al añadir.");
                }
                else {
                    res.status(200);
                    res.send("Eliminado.");
                }
            });
        }
    });
};

const update = (req, res) => {

    Estudiante.findOne({cedula: req.params.id}, (req, doc) => {
        if (isEmpty(doc)) {
            res.status(200);
            res.send("Error: No encontrado.");
        }
        else {
            let conditions = { cedula: req.params.id },
                options = { multi: true };
            Estudiante.update(conditions, req.body, options, (err, estudiante) => {
                if (err) {
                    res.status(200);
                    res.send(err);
                }
                else {
                    res.send(estudiante);
                }
            });
        }
    });
};
const aceptado = {
    aceptado: true,
    mensaje: "¡Ha podido accesar exitosamente!"
}
const rechazado = {
    aceptado: false,
    mensaje: "Lamentablemente, no ha podido accesar."
}

const getById = (req, res) => {
    Estudiante
    .findOne({ cedula: req.params.id})
    .populate({ path: 'materias', select: ['nota','nombre'] })
    .exec( (err, doc) => {
        if (isEmpty(doc)) {
            res.status(200);
            res.send(rechazado);
        }
        else {
            res.status(200);
            res.send(doc.materias);
        }
    });
};

const getIndice = (req, res) => {
    Estudiante
        .findOne({ cedula: req.params.id })
        .populate({ path: 'materias', select: ['nota', 'creditos'] })
        .exec((req, doc) => {
        if(isEmpty(doc)) {
            res.status(200)
            res.send(rechazado)
        }
        else {
            res.status(200)
            res.send(calcularIndice(doc.materias))
        }
    })
};

const calcularIndice = (materias) => {
    let creditos = 0;
    let sNota = 0
    materias.forEach(materia => {
            creditos = creditos + materia.creditos
            sNota = sNota + materia.nota * materia.creditos            
    });
    let total = sNota / creditos
    return JSON.stringify({ indice: total })
}

const addNota = (req, res) => {
    const materia = new Materia(req.body)    
    Estudiante.findOne({ cedula: req.params.id}, (err, doc) => {
        if (isEmpty(doc)) {
            res.status(200)
            res.send(rechazado)
        }
        else {
            materia.save((err) => {
                if (err) {
                    res.status(500);
                    res.send("Error al añadir materia");
                }
                else {
                    res.status(200);
                    doc.materias.push(materia._id)
                    doc.save((err) => {
                        if (err) {
                            res.status(500);
                            res.send("Error al añadir materia");
                        }
                        else {
                            res.status(200);
                            res.send(doc)
                        }
                    })
                }
            })

        }
    })
};


module.exports = {
    add: add,
    get: get,
    del: del,
    update: update,
    getById: getById,
    getIndice: getIndice,
    addNota: addNota
};