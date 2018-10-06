var express = require('express');
var app = express();

var things = require('./things.js');

app.all('/test', (req, res) => {
    res.send('Hello with all!');
});

app.use('/things', things);

app.listen(3000);