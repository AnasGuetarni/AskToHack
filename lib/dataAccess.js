/* Requests on mongodb */

console.log('-> dataAccess.js loaded'.yellow);

var mongoose = require('mongoose');
// var Users = require('./db');
// var Rooms = require('./db');
let data = require('./db');
module.exports = {

  // findAll: function(callback){
  //   Users.find(function (err, users) {
  //     if (err) throw err;
  //     else callback(users);
  //   });
  // },
  //
  // findAllRooms: function(callback){
  //   Rooms.find(function(err, rooms){
  //     if (err) throw err;
  //     else callback(rooms);
  //   });
  // }

  findAll: function(callback){
    data.modelUsers.find(function (err, users) {
      if (err) throw err;
      else callback(users);
    });
  },

  findAllRooms: function(callback){
    data.modelRooms.find(function(err, rooms){
      if (err) throw err;
      else callback(rooms);
    });
  }

}
