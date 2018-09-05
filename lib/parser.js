console.log('-> parser.js loaded'.yellow);

var bodyParser = require('body-parser');

var commands = require('./commands');

module.exports = {

  parser_message: function(message, callback){
    for (i in message){
      if (message[i] === ' '){
        let message_res = commands.parser_commands(message.slice(0, i));
        return message;
      }
    }
  }
}
