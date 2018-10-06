var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send('This is home with get');
})

app.post('/about', function(req, res){
    res.send('This is about with post \n');
})

app.all('/test', function(req, res){
    res.send('Hello with all!');
});

app.listen(3000);