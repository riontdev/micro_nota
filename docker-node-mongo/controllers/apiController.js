const Api = require('./../models/apiModel');
const util = require('util');

function isEmpty(obj) {
    for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
};

const get = function (req, res) {
    Api.find(function (err, Api) {
        if (err) {
            res.status(500);
            res.send("Error del servidor.");
        }
        else {
            res.status(200);
            res.send(Api);
        }
    });
};

const add = function (req, res) {
    const api = new Api(req.body);
    api.save(function (err) {
        if (err) {
            res.status(500);
            res.send("Error al añadir.");
        }
        else {
            res.status(200);
            res.send(api);
        }
    });
};

const del = function (req, res) {
    Api.findById(req.params.id, function (err, api) {
        if (err) {
            res.status(500);
            res.send("Error.");
        }
        else {
            api.remove(function (err) {
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

const update = function (req, res) {

    Api.findById(req.params.id, function (err, doc) {
        if (isEmpty(doc)) {
            res.status(200);
            res.send("Error: No encontrado.");
        }
        else {
            let conditions = { _id: req.params.id },
                update = { title: req.body.title },
                options = { multi: true };
            Api.update(conditions, update, options, function (err, api) {
                if (err) {
                    res.status(200);
                    res.send(err);
                }
                else {
                    res.send(api);
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
const getById = function (req, res) {
    Api.findById(req.params.id, function (err, doc) {
        if (isEmpty(doc)) {
            res.status(200);
            res.send(rechazado);
        }
        else {
            res.status(200);
            res.send(aceptado);
        }
    });
};

module.exports = {
    add: add,
    get: get,
    del: del,
    update: update,
    getById: getById
};