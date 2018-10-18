var express      = require('express');
var bodyParser   = require('body-parser');
var multer       = require('multer');
var cookieParser = require('cookie-parser');

var app    = express();
var upload = multer();

var port = process.env.PORT || 8080;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

// Router
var movies = require('./movies.js');

// Use router
app.get('/', (req, res) => {
   res.redirect('/movies');
});

app.use('/movies', movies);


app.listen(port, () => {
    console.log('Our app is running on http://localhost:' + port);
});
