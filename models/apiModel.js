const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const apiModel = new Schema({
    title: String,
});

module.exports = mongoose.model("Api", apiModel);