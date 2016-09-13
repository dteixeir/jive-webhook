
var Bot = require('slackbots');
var slackbot;
var headers = '';
var body = '';

// create a bot
// temporary fix until making it an app and using push notifications
var bot = {
  message: function(username, headers, body) {
    this.headers = headers;
    this.body = body;

    
    slackbot = new Bot({
      token: 'xoxb-78860780950-vR0Tga9ox1rG2LIhHRnzLNOc',
      name: 'jivebot'
    });

    slackbot.on('start', function() {
      slackbot.postMessageToUser('danny', " --------------- headers --------------- \n" + headers);
      slackbot.postMessageToUser('danny', "--------------- body --------------- \n" + body);
    });
  }
}

module.exports = bot;