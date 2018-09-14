console.log('-> router.js loaded'.yellow);

var fs = require('fs');

var Users = require('./db');
var dataAccess = require('./dataAccess');
var functions = require('./functions');

var sessions = require('express-session');
var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var formidable = require('formidable');
var path = require('path');

module.exports = function(app){

  app.get('/', [functions.notLogged], function(req, res, next) {
    var erreur = false;
    if (req.query.failed)
      erreur = true;
      res.render('../view/pages/welcome.ejs', {
        erreur: erreur,
      });
  });

  app.get('/signin', function(req, res) {

    let error = req.query.failed;
    if(error !== "true") error = "";

    res.render('../view/pages/signin.ejs', {
       error : error
    });
  });

  app.post('/signin', function(req, res) {
    let sess = req.session;
    dataAccess.findAll(function(users){
      functions.check_user(users, req.body.username, req.body.password, sess, function(logged){
        if (logged>=1) {
          res.redirect('/home');
        }
        else res.redirect('/signin?failed=true');
      });
    });
  });

  app.get('/signup', function(req, res) {

    let error = req.query.failed;
    if(error !== "true") error = "";

    res.render('../view/pages/signup.ejs', {
      error : error
    });
  });

    app.post('/signup', function(req, res) {
      let username = req.body.username;
      let password = req.body.password;
      let confirmPassword = req.body.confirmPassword;
      dataAccess.findAll(function(users){
        functions.insert_user(users, username, password, confirmPassword, function(log){
          if (log == 1){
            res.redirect('/home');
          }
          else res.redirect('/signup?failed=true');
        });
      });
    });


    app.get('/home', [functions.requireLogin], function(req, res) {
      dataAccess.findAllRooms(function(rooms){
        res.render('../view/pages/home.ejs', {
          session: sess,
          listRooms: rooms
        });
      });
    });

  app.get('/chat/:id', [functions.requireLogin], function(req, res) {
    res.render('../view/pages/chat.ejs', {
      session : sess,
      room    : req.params.id
    });
  });

  app.get('/logout', function(req,res){
    req.session.destroy(function(){
      res.redirect("/");
    });
  });

  app.use(function(req, res){
    res.render('../view/pages/404error', { title: 'AskToHack - Impossible de trouver la page demandee' });
  });



}
