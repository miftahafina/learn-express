var express      = require('express');
var bodyParser   = require('body-parser');
var multer       = require('multer');
var mongoose     = require('mongoose');
var cookieParser = require('cookie-parser');
var upload       = multer();
var app          = express();

// Connect
mongoose.connect('mongodb://localhost/my_db',  {useNewUrlParser: true});

// view engine
app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json (req.body)
app.use(bodyParser.json());
// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing multipart/form-data
app.use(upload.array());
// static dir
app.use(express.static('public'));
// for parsing cookie (req.cookies)
app.use(cookieParser())

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
    var personInfo = req.body;

    if (!personInfo.name || !personInfo.age || !personInfo.nationality) {
        res.render('show_message', {
            message: "Sorry, you provided wrong info", type: "error"
        });

    } else {
        var newPerson = new Person({
            name: personInfo.name,
            age: personInfo.age,
            nationality: personInfo.nationality
        });

        newPerson.save((err, Person) => {
            if (err) {
                res.render('show_message', { message: "Database error", type: "error"});

            } else {
                res.render('show_message', {
                    message: "New Person added",
                    type: "Success",
                    person: personInfo
                });
            }
        });
    }
})

app.get('/person/all', (req, res) => {
    Person.find(function(err, response){
        res.json(response);
    });
});

app.get('/person/:name/:nationality', (req, res) => {
    Person.update({name: req.params.name}, {nationality: req.params.nationality}, (err, response) => {
        res.json(response);
    });
});

app.get('/person/:id', (req, res) => {
    // res.send(req.params.id);
    Person.findById(req.params.id, (err, response) => {
        res.json(response);
    });
});

// Learn cookies
app.get('/set-kuki', (req, res) => {
    // set cookie with expiration
    res.cookie('ign', 'evanme', {maxAge: 360000});
    
    // set cookie without expiration
    res.cookie('name', 'afin')
       .send('cookies telah diset');


    console.log('Kuki: ', req.cookies);
    // cek di console client: document.cookie
});

app.get('/clear-kuki', (req, res) => {
    res.clearCookie('name')
       .send('cookie \'name\' cleared');
});



app.listen(3000);