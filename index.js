var express      = require('express');
var bodyParser   = require('body-parser');
var multer       = require('multer');
var cookieParser = require('cookie-parser');

var app    = express();
var upload = multer();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

// Router
var movies = require('./movies.js');

// Use router
app.use('/movies', movies);

app.listen(2000);
