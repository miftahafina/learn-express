var express = require('express');
var app = express();

var things = require('./things.js');

app.get('/:id([0-9]{5})/:name', (req, res) => {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});

app.all('/test', (req, res) => {
    res.send('Hello with all!');
});

// Other routes (404)
app.get('*', function(req, res){
    res.send('404 not found, bruh!');
});

app.use('/things', things);
app.listen(3000);