// dependencies
var express = require('express');
var app = express();
var session = require('express-session');
var uuid = require('node-uuid');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


// configuration

// parsing POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static files
app.use(express.static('public'));

// templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


// database setup

mongoose.connect('localhost/pollit');

var Schema = mongoose.Schema;

var pollQuestionSchema = new Schema({
    questionNum: Number,
	question: String,
    answers: [{
	   answerNum: Number,
       answer: String 
    }]
}, {collection: 'pollQuestions'});
var PollQuestion = mongoose.model('pollQuestion', pollQuestionSchema);

// TODO:  Add the schema for pollResults


// routes

// view routes
app.get('/', function(request, response) {
    response.redirect('/listPolls');
});

app.get('/listPolls', function(request, response) {
    PollQuestion.find({}, function(error, questions) {
        if (error) {
            console.log('Error:', error);
        } else {
            if (questions.length > 0) {
	            response.render('list_polls', {title: 'Choose a Poll',
                                               questions: questions});
            }
        }
    });
});

// TODO:  Add the additional routes listed in the requirements document


// setup the web server listener

// server port
app.set('port', process.env.PORT || 3000);

// start the listener
app.listen(app.get('port'), function() {
	console.log('Node/Express listening on port ' + app.get('port'));
	console.log('Use CTRL-C to exit');
});
