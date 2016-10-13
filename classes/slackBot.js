
var Bot = require('slackbots');
var Slack = require('node-slack-upload');
var fs = require('file-system');
var bodyParser = require("body-parser"); 
var Q = require('q');
var config = require('../config.json');
var slack = new Slack(process.env.UPLOAD_KEY || config.UPLOAD_KEY);
var slackbot;
var headers = '';
var body = '';
var users = [];

// create a bot
// temporary fix until making it an app and using push notifications
var bot = {
  message: function(headers, body) {
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

  snippet: function(headers, body) {
    var deferred = Q.defer();

    for (var k = 0; k < users.length; k++) {

      console.log(headers);

      slack.uploadFile({
        content: [headers, body],
        filetype: 'JavaScript/JSON',
        filename: 'webhook.json',
        title: 'WebHook',
        channels: '@' + users[k]
      }, function(error) {
        if (error) {
          deferred.reject(err);
        } else {
          deferred.resolve();
        }
      });

      return deferred.promise;
    }
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


// Test!!!!!!



