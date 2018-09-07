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

      parser.parser_message(msg, function(resv){
        if (resv != undefined){
          for(i in resv){
            console.log('Envoye: ' + resv[i].name);
            io.emit('res_chat_command', resv[i]);
          }
        }
      });

    });
  });

}
