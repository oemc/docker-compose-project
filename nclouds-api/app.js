const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');

const database_service = require('./database_service');
const cache_service = require('./cache_service');

app.use(bodyParser.json({limit: '1mb'}));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, content-type, Accept');
    next();
});

app.get('/database', async (req, res, next) => {
    await database_service.get()
        .then(function (result) {
            res.send(result);
        })
        .catch(next);
});

app.post('/database', async (req,res, next) => {
    await database_service.save(req.body.user, req.body.password)
        .then(function (result) {
            res.send(result);
        })
        .catch(next);
});

app.get('/cache', async (req, res, next) => {
    await cache_service.get()
        .then(function (result) {
            res.send(result);
        })
        .catch(next);
});

app.post('/cache', async (req,res, next) => {
    await cache_service.save(req.body.user, req.body.password)
        .then(function (result) {
            res.send(result);
        })
        .catch(next);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
