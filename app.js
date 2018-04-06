const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const apiRouter = require('./router/apiRouter')
const estudianteRouter = require('./router/estudianteRouter')
const routeHelpers = require('./helpers/microApi');
//DB setup
mongoose.connect('mongodb://admin:admin@ds235609.mlab.com:35609/micro_nota')
const db = mongoose.connection

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



app.get('/', routeHelpers.testApi, (req, res, next) => {
    console.log(req.body)
    res.send(JSON.stringify({ list: req.body}))
});

app.use('/api', apiRouter);
app.use('/estudiante', estudianteRouter);

app.listen(8080, function () {
    console.log('Example app listening on port 80!')
});




db.on('error', console.error.bind(console, 'MongoDB connection error:'));