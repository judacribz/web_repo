const bodyParser = require('body-parser');
const opn = require('opn');
const express = require('express');
const app = express();

const INIT_MSG = 'Please enter a username to check';

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
    response.render('enterUsername', {
        title: 'Testing',
        message: INIT_MSG
    });
});


app.post('/checkUsername', function (request, response) {
    var username = request.body.username;
    console.log(username);
    response.render('enterUsername', {
        title: username,
        message: username
    });
});

app.listen(app.get('port'), function () {
    console.log('Web server listening at ' + url);
    // opn(url);
})