var express = require('express');
var app = express();

app.get('/hello', function(req, res){
    res.send('Hello with get!');
});

app.post('/hello', (req, res) => {
    res.send('Hello with post');
});

app.listen(3000);