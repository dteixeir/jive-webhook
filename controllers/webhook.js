var slackbot = require('../classes/slackBot');

module.exports = function (app, route) {
    app.post("/webhook", function(req, res, next) {
        //console.log(req);
        //console.log(req.body);
        var text = JSON.stringify(req.headers);
        var body = JSON.stringify(req.body);
        slackbot.message('danny', text, body);
        
        //slackbot.message('danny', JSON.stringify(req.body));
        res.send({ status: 200 });
    });

    // Return middleware ?? per use case stuff?
    return function(req, res, next) {
        next();
    };
};