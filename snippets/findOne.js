app.post('/checkUsername', function (request, response) {
    checkUsername(request, response);
});

function checkUsername(req, res) {
    var name = req.body.username;
    var msg = NEW_USER;

    User.findOne({
        username: name
    }, function (err, user) {
        if (user != null) {
            msg = USER_EXISTS;
        }

        res.render('enterUsername', {
            title: TITLE,
            message: msg
        });
    });
}
