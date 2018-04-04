const express = require('express')
const apiController = require('./../controllers/estudianteController')
const estudianteRouter = express.Router()

estudianteRouter.route('')
    .get(apiController.get)
    .post(apiController.add);

estudianteRouter.route('/:id')
    .get(apiController.getById)
    .delete(apiController.del)
    .put(apiController.update);

estudianteRouter.route('/:id/indice')
    .get(apiController.getIndice)


estudianteRouter.route('/:id/nota')
    .post(apiController.addNota)

module.exports = estudianteRouter;