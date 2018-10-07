var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var things = require('./things.js');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/things', (req, res, next) => {
    console.log('A new request for things received at ' + Date.now());
    next();
});

// app.use('/things', (req, res, next) => {
//     console.log('A request for things received at ' + Date.now());
// });

app.get('/things/:id([0-9]{5})/:name', (req, res) => {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});

app.all('/test', (req, res) => {
    res.send('Hello with all!');
});

app.use('/things', things);

// Other routes (404)
app.get('*', function(req, res){
    res.send('404 not found, bruh!');
});

app.listen(3000);