const bodyParser = require('body-parser');
const express = require('express');
const app = express();

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

// configure view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

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
    var username = req.body.username;
    var msg = NEW_USER;

    if (USERS.indexOf(username.toLowerCase()) > -1) {
        msg = USER_EXISTS;
    }

    res.render('enterUsername', {
        title: TITLE,
        message: msg
    });
}

app.listen(app.get('port'), function () {
    console.log('Web server listening at ' + url);
    // opn(url);
})