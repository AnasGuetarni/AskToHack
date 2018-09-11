console.log('-> parser.js loaded'.yellow);

var bodyParser = require('body-parser');
var netstat = require('netstat');

var commands = require('./commands');
var webapp = require('./types/exploits/webapp');
var dos = require('./types/exploits/dos');
var local = require('./types/exploits/privileges');
var remote = require('./types/exploits/remote');
var shellcode = require('./types/shellcode');

let command_tab = [
  {
    name: "ping",
    role: "Check if host is up (ex: ping google.com)"
  },
  {
    name: "nmap",
    role: "Check open ports of a host (ex: nmap 192.168.1.1)"
  },
  {
    name: "ifconfig",
    role: "Give the ip of the exploit machine (ex: ifconfig)"
  },
  {
    name: "netstat",
    role: "Give the network connections (ex: netstat)"
  },
  {
    name: "exploit",
    role: "Cherche les differents exploits (ex: exploit web latest)",
    type: [
      {
        name: "web",
        get_data: function(callback, command_){
          webapp.webapp_latest(function(result){
            callback(result, command_);
          });
        }
      },
      {
        name: "dos",
        get_data: function(callback, command_){
          dos.dos_latest(function(result){
            callback(result, command_);
          });
        }
      },
      {
        name: "remote",
        get_data: function(callback, command_){
          remote.remote_latest(function(result){
            callback(result, command_);
          });
        }
      },
      {
        name: "local",
        get_data: function(callback, command_){
          local.local_latest(function(result){
            callback(result, command_);
          });
        }
      }
    ]
  },
  {
    name: "shellcode",
    role: "Cherche les differents shellcodes (ex: shellcode latest)",
    get_data: function(callback, command_){
      shellcode.shellcode_latest(function(result){
        console.log('result: '+result);
        callback(result, command_);
      });
    }
  }
];


module.exports = {

  parser_message: function(message, callback){

    let parsing_array = message.split(' ');
    let command_;
    let arguments_;
    let res_v = new Array();

    command_ = parsing_array.shift();
    arguments_ = parsing_array;

    switch (command_) {
      case "ping":
        if (arguments_ !== undefined && arguments_ != ""){
          commands.ping_function(arguments_, function(active){
            for(i in active){
              if (active[i] == true)
                res_v.push({ name: arguments_[i], state: "up" });
              else if (active[i] == false)
                res_v.push({ name: arguments_[i], state: "down" });
            }
            callback(res_v, command_);
          });
        }
        else if (arguments_ == "") {
          command_tab[0].params;
          res_v.push({ name: "params", state: "missing host (ex: ping google.com)" });
          callback(res_v, command_);
        }
        break;
      case "ifconfig":
        commands.ifconfig_function(function(res){
          callback(res, command_);
        });
        break;
      case "netstat":
        commands.netstat_function(function(res){
          callback(res, command_);
        });
        break;
      case "exploit":
        if (arguments_ == "" || arguments_ == " " || arguments_ === undefined){
          res_v.push({ name: "ex: exploit [(web/remote/local/dos) --latest] || (id_exploit) ", link: "params" });
          callback(res_v, command_);
        }
        else if (arguments_ !== undefined) {
            command_tab.forEach( function(x){
              if (x.name == "exploit"){
                x.type.forEach( (y) => y.name == arguments_[0] ? y.get_data(callback, command_) : {} );
              }
            });

        }
        break;
      case "shellcode":
      console.log('shellcode:' + arguments_ + '/');
        if (arguments_ == "" || arguments_ === undefined){
          res_v.push({ name: "ex: shellcode [--latest] ||  (id_shellcode) ", link: "params" });
          callback(res_v, command_);
        }
        else {
          command_tab.forEach( (x) => (x.name == command_) ? x.get_data(callback, command_) : {} );
        }
        break;
      case "help":
        command_tab.forEach( (x) => res_v.push({ name: x.name, role: x.role }) );
        callback(res_v, command_);
        break;        
      default:
    }
  }

}
