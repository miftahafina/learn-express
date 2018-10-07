var express    = require('express');
var bodyParser = require('body-parser');
var multer     = require('multer');
var mongoose   = require('mongoose');
var upload     = multer();
var app        = express();

// Connect
mongoose.connect('mongodb://localhost/my_db',  {useNewUrlParser: true});

// view engine
app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json());
// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing multipart/form-data
app.use(upload.array());
// static dir
app.use(express.static('public'));

// Model
var personSchema = mongoose.Schema({
    name       : String,
    age        : Number,
    nationality: String
});
var Person = mongoose.model("Person", personSchema);

app.get('/person', (req, res) => {
    res.render('person');
});

app.post('/person', (req, res) => {
    res.send(req.body);
})

app.listen(3000);