var express = require('express');
var app = express();

var things = require('./things.js');

app.get('/:id/:name', (req, res) => {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});

app.all('/test', (req, res) => {
    res.send('Hello with all!');
});


app.listen(3000);