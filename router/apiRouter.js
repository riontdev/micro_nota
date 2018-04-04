const express = require('express')
const apiController = require('./../controllers/apiController')
const apiRouter = express.Router()

apiRouter.route('')
    .get(apiController.get)
    .post(apiController.add);

apiRouter.route('/:id')
    .get(apiController.getById)
    .delete(apiController.del)
    .put(apiController.update);

module.exports = apiRouter;