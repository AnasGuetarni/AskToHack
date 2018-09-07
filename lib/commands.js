"use strict";

console.log('-> commands.js loaded'.yellow);

//const spawn = require('child_process').spawn;
var ping = require('ping');
var sleep = require('sleep');

function msleep(n) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
}

function sleep(n) {
  msleep(n*1000);
}


module.exports = {
  parser_arguments: function(command, args){
    if (args[0] == ' ') args = args.slice(1, args.length);
    return args.split(" ");;
  },

  ping_function: function(args, callback){
    let args_tab = new Array();
    let i = 1;

    args.forEach(function(host){
      ping.sys.probe(host, function(isAlive){
        args_tab.push(isAlive);
        if (args_tab.length == args.length) callback(args_tab);
      });
      i++;
    });

  }

}
