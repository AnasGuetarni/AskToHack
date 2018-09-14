console.log('-> socket.js loaded'.yellow);

var dataAccess = require('./dataAccess');
var parser = require('./parser');

var functions = require('./functions');

var socketio = require('socket.io');
var express = require('express');
var childProcess = require('child_process');

module.exports = function(http){

  var io = require('socket.io')(http);

  io.on('connection', function(socket){

    socket.on('join-channel', function(username, room){
        socket.join(room);
        io.to(room).emit("welcome", username);
    });

    socket.on('back-home', function(username, room){
      io.to(room).emit("back-home-message", username);
      socket.leave(room);
    });

    socket.on('create_room', function(roomName, roomDesc){

      dataAccess.findAllRooms(function(rooms){
        functions.insert_room(rooms, roomName, roomDesc, function(bool){
          if(bool == 1){
            io.emit('new_room', roomName, roomDesc);
          }
        });
      });
    });

    socket.on('delete_room', function(roomName){
      functions.delete_room(roomName, function(bool){
        console.log(bool);
        if(bool == 1){
          io.emit('room_deleted', roomName);
          io.to(roomName).emit("back_home");
        }
      });
    });

    socket.on('sendMessage', function(username, room, msg){
        io.to(room).emit("newMessage", username, msg);

        //commandes anas
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
              case "exploit":
                for (i in resv){
                  io.emit('res_chat_exploit', resv[i]);
                }
                break;
              case "shellcode":
                for (i in resv){
                  io.emit('res_chat_shellcode', resv[i]);
                }
                break;
              case "help":
                for (i in resv){
                  io.emit('res_chat_help', resv[i]);
                }
                break;
              default:
            }
          }
        });
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    });

  });

}
