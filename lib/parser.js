console.log('-> parser.js loaded'.yellow);

var bodyParser = require('body-parser');
var sleep = require('sleep');
var netstat = require('netstat');

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
  },
  {
    name: "ifconfig"
  },
  {
    name: "netstat"
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
    let res_v = new Array();

    //message += " ";

    for (i in message){
      if (message[i] === ' ' && v == false){
        for (o in command_tab){
          if (command_tab[o].name === message.slice(0, i)) {
            command_ = command_tab[o].name;
            if (command_tab[o].params != undefined)
              arguments_ = commands.parser_arguments(command_tab[o].name, message.slice(i, message.length));
            v = true;
          }
        }
      }
    }

    switch (command_) {
      case "ping":
        commands.ping_function(arguments_, function(active){
          for(i in active){
            if (active[i] == true)
              res_v.push({ name: arguments_[i], state: "up" });
            else if (active[i] == false)
              res_v.push({ name: arguments_[i], state: "down" });
          }
          callback(res_v, command_);
        });
        break;
      case "ifconfig":
        commands.ifconfig_function(function(res){
          callback(res, command_);
        });
        break;
      case "netstat":
        commands.netstat_function(function(res){
          console.log('in parser switch: ' + res);
          //res = JSON.stringify( netstat.parse( res ), null, 2 ) + '\n';
          callback(res, command_);
        });
        break;
      default:
    }
  }

}
