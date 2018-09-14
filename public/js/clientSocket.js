"use strict";

  var socket = io.connect('http://172.20.2.79:5250');


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  chat.ejs uses ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  socket.on('welcome', function(username){
    $('#messages').append($('<li class="li_terminal welcome_message">').text("> " + username + ' is online !'));
  });

  socket.on('back_home', function(){
    document.location.href='../home';
  });

  socket.on('back-home-message', function(username){
    $('#messages').append($('<li class="li_terminal back_message">').text("> " + username+ ' disconnected !'));
  });

  socket.on('newMessage', function(username, msg){
    if (msg == "clear") $('.li_terminal').remove();
    else $('#messages').append($('<li class="li_terminal">').text(username + "> " + msg));
  });

  socket.on('res_chat_ping', function(msg_1){
    $('#messages').append($('<li class="li_terminal server">').text(msg_1.name + "> " + msg_1.state));
  });

  socket.on('res_chat_ifconfig', function(msg_){
    $('#messages').append($('<li class="li_terminal server">').text(msg_.name + "> " + msg_.address));
  });

  socket.on('res_chat_netstat', function(msg_){
    $('#messages').append($('<li class="li_terminal server">').text(msg_.name + "> " + msg_));
  });

  socket.on('res_chat_exploit', function(msg){
    $('#messages').append($('<li class="li_terminal server">').text(msg.link + "> " + msg.name));
  });

  socket.on('res_chat_shellcode', function(msg){
    $('#messages').append($('<li class="li_terminal server">').text(msg.link + "> " + msg.name ));
  });

  socket.on('res_chat_help', function(msg){
    $('#messages').append($('<li class="li_terminal server">').text(msg.name + "> " + msg.role ));
  });


  socket.emit('join-channel', sess.username, room);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  home.ejs uses ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* Créé la carte de la room chez tous les utilisateurs au moment ou un utilisateurs ajoute une room */
socket.on('new_room', function(roomName, roomDesc){
  console.log('[[client]] room '+roomName+" create with success");
  $('#row').append("<div id=\""+roomName+"\" class=\"col-lg-4 col-md-6 col-sm-12 mb-4 sm-hidden\">");
  $('#'+roomName).append(" <div id=\"card_"+roomName+"\" class=\"card\">");
  $('#card_'+roomName).append("<img class=\"card-img-top img_card\" src=\"img/hacker.jpg\" alt=\"Card image cap\">");
  $('#card_'+roomName).append("<div id=\"card_body_"+roomName+"\" class=\"card-body card_tcenter\">");
  $('#card_body_'+roomName).append("<h4 class=\"card-title\">Room "+roomName+"</h4>")
                            .append("<p class=\"card-text\">"+roomDesc+"</p>")
                              .append("<button onclick=\"chat("+roomName+")\" class=\"btn btn-primary\">Connect</button>")
                              .append("<button class=\"btn btn-secondary\" onclick=\"deleteRoom("+roomName+")\">Delete</button>");


});

socket.on('room_deleted', function(roomName){
  $('#'+roomName).remove();
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
