console.log('-> parser.js loaded'.yellow);

var bodyParser = require('body-parser');
var sleep = require('sleep');

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

function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}
function sleep(n) {
  msleep(n*1000);
}

module.exports = {

  parser_message: function(message, callback){

    let command_;
    let arguments_;
    let message_;
    let v = false;

    for (i in message){
      if (message[i] === ' ' && v == false){
        for (o in command_tab){
          if (command_tab[o].name === message.slice(0, i)) {
            command_ = command_tab[o].name;
            arguments_ = commands.parser_arguments(command_tab[o].name, message.slice(i, message.length));
            v = true;
          }
        }
      }
    }

    switch (command_) {
      case "ping":
        let res_v = new Array();
        commands.ping_function(arguments_, function(active){
          for(i in active){
            if (active[i] == true)
              res_v.push({ name: arguments_[i], state: "up" });
            else if (active[i] == true)
              res_v.push({ name: arguments_[i], state: "down" });
          }
          callback(res_v);
        });
        break;
      default:
    }
  }

}
