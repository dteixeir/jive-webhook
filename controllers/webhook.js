var slackbot = require('../classes/slackBot');

module.exports = function (app, route) {
    app.post("/webhook", function(req, res, next) {
        var headers = JSON.stringify(req.headers);
        var body = JSON.stringify(req.body);

        slackbot.message(headers, body);
        
        //slackbot.message('danny', JSON.stringify(req.body));
        res.send({ status: 200 });
    });

    app.post("/webhook/add/:username", function (req, res, next) {
        if (slackbot.addUser(req.params.username)) {
            res.send({ status: 200 });
        }
        
        else
            res.send({ status: 400 });
    });

    app.post("/webhook/remove/:username", function (req, res, next) {
        if (slackbot.removeUser(req.params.username)) {
            res.send({ status: 200 });
        }
        else
            res.send({ status: 400 });
    });

    app.get("/webhook/users", function (req, res, next) {
        res.send({ data: JSON.stringify(slackbot.getUsers()) });
    });

    app.post('/webhook/snippet', function (req, res, next) {
        var headers = JSON.stringify(req.headers);
        var body = JSON.stringify(req.body);

        if (slackbot.snippet(headers, body)) {
            res.send({ status: 200 });
        } else {
            res.send({ status: 400 });
        }
    });
    // Return middleware ?? per use case stuff?
    return function(req, res, next) {
        next();
    };
};