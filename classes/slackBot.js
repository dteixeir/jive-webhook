
var Bot = require('slackbots');
var slackbot;
var headers = '';
var body = '';
var users = [];

// create a bot
// temporary fix until making it an app and using push notifications
var bot = {
  message: function(username, headers, body) {
    this.headers = headers;
    this.body = body;

    
    slackbot = new Bot({
      token: process.env.BOT_KEY,
      name: 'jivebot'
    });

    slackbot.on('start', function () {
      for (var i = 0; i < users.length; i++) {
        slackbot.postMessageToUser(users[i], " --------------- headers --------------- \n" + headers);
        slackbot.postMessageToUser(users[i], "--------------- body --------------- \n" + body);
      }
    });
  },

  addUser: function (username) {
    if (username) {
      users.push(username);
      return true;
    }
    else
      return false;
  },

  removeUser: function (username) {
    if (username) {
      var i = users.indexOf(username);
      if(i != -1) {
        users.splice(i, 1);
        return true;
      }
    }

    return false;
  },

  getUsers: function () {
    return users;
  }
}

module.exports = bot;


// Test!