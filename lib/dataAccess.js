/* Requests on mongodb */

console.log('-> dataAccess.js loaded'.orange);

var mongoose = require('mongoose');
var Users = require('./db');

module.exports = {

  findAll: function(callback){
    Users.find(function (err, users) {
      if (err) throw err;
      else callback(users);
    });
  }
}
