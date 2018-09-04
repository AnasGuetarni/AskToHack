console.log('-> socket.js loaded'.yellow);

var dataAccess = require('./dataAccess');
var socketio = require('socket.io');
var express = require('express');
var childProcess = require('child_process');

module.exports = function(http){

  var io = require('socket.io')(http);

  io.on('connection', function(socket){

    socket.on('req_chat_message', function(msg){
      socket.emit('res_chat_message', msg);
    });
  });

}
