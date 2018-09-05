console.log('-> parser.js loaded'.yellow);

var bodyParser = require('body-parser');

var commands = require('./commands');

let command_tab = [
  {
    name: "ping",
    params: {
      host: String,
      port: String
    }
  },
  {
    name: "nmap",
    params: {
      host: String,
      type: String
    }
  }
]

//console.log(command_tab);

module.exports = {

  parser_message: function(message){
    for (i in message){
      if (message[i] === ' '){
        //let command = commands.parser_commands(message.slice(0, i));
        for (o in command_tab){
          if (command_tab[o].name === message.slice(0, i)) {
            console.log(command_tab[o].name + ' command !');
            console.log('args normalement: ' + message.slice(i, message.length));
            let message_res = commands.parser_arguments(command_tab[o].name, message.slice(i, message.length));
            console.log('Parser arguments: ' + message_res);
          }
        }
        return message;
      }
    }
  }

}
