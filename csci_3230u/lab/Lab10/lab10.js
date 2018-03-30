const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const uuid = require('uuid/v1');
const session = require('express-session');


const TITLE = "Lab09";
const USERS = ['admin', 'bsmith', 'rfortier'];
const INIT_MSG = 'Please enter a username to check';
const NEW_USER = "That username is available.";
const USER_EXISTS = "This username already exists. Please try another.";

app.set('port', process.env.PORT || 3000);
var url = 'http://localhost:' + app.get('port');

// middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/university');

// configure view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// configure sessions
app.use(session({
    genid: function (request) {
      return uuid();
    },
    resave: false,
    saveUninitialized: false,
    //cookie: {secure: true},
    secret: 'apollo slackware prepositional expectations'
}));

// database schema
var Schema = mongoose.Schema;
var userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    index: true
  },
  password: String
}, {
  collection: 'users'
});
var User = mongoose.model('users', userSchema);


User.count(function(err, count) {
    console.dir(err);
    console.dir(count);

    if( count == 0) {
        USERS.forEach(function(name) {
            var newUser = new User({
                username: name,
                password: "null"
            });
        
            newUser.save();
        });

        console.log(count);
    }
});

// routes
app.get('/', function (request, response) {
    response.redirect('/checkUsername');
});

app.get('/checkUsername', function (request, response) {
    response.render('enterUsername', {
        title: TITLE,
        message: INIT_MSG
    });
});

app.post('/checkUsername', function (request, response) {
    checkUsername(request, response)
});

function checkUsername(req, res) {
    var name = req.body.username;
    var msg = NEW_USER;

    User.findOne({username: name},function (err, user) {
        if (user != null) {
            msg = USER_EXISTS;
        }

        res.render('enterUsername', {
            title: TITLE,
            message: msg
        });
    });
}

app.listen(app.get('port'), function () {
    console.log('Web server listening at ' + url);
    // opn(url);
})


