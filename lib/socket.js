console.log('-> socket.js loaded'.yellow);

var dataAccess = require('./dataAccess');
var parser = require('./parser');

var socketio = require('socket.io');
var express = require('express');
var childProcess = require('child_process');

module.exports = function(http){

  var io = require('socket.io')(http);

  io.on('connection', function(socket){

    socket.on('req_chat_message', function(msg, username){

      io.emit('res_chat_message', msg, username);

      parser.parser_message(msg, function(resv, command){
        if (resv != undefined){
          switch (command) {
            case "ping":
              for(i in resv){
                io.emit('res_chat_ping', resv[i]);
              }
              break;
            case "ifconfig":
              for (i in resv){
                io.emit('res_chat_ifconfig', resv[i]);
              }
              break;
            case "netstat":
              for (i in resv){
                io.emit('res_chat_netstat', resv[i]);
              }
              break;
            default:
          }
        }
      });

    });

    socket.on('req_chat_welcome', function(username){
      io.emit('res_chat_welcome', username);
    });
    
  });

}
