var express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.send('Hai');
});

app.listen(2000);
