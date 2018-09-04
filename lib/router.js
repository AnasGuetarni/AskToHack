console.log('-> router.js loaded'.yellow);

var fs = require('fs');

var Users = require('./db');
var dataAccess = require('./dataAccess');
var functions = require('./functions')

var session = require('express-session');
var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var formidable = require('formidable');
var path = require('path');

module.exports = function(app){

  app.get('/', function(req, res, next) {
    var erreur = false;
    if (req.query.failed)
      erreur = true;
      res.render('../view/pages/welcome.ejs', {
        erreur: erreur,
      });
  });

  app.get('/signin', function(req, res) {
    res.render('../view/pages/signin.ejs', {
    });
  });

  app.post('/signin', function(req, res) {
    var sess = req.session;
    dataAccess.findAll(function(users){
      functions.check_user(users, req.body.username, req.body.password, sess, function(logged){
        if (logged>=1) {
          res.redirect('/home');
        }
        else res.redirect('/?failed=true');
      });
    });
  });

  app.get('/signup', function(req, res) {
    res.render('../view/pages/signup.ejs', {

    });
  });

  app.get('/home', [functions.requireLogin], function(req, res) {
    res.render('../view/pages/home.ejs', {
      sess: sess
    });
  });

  app.get('/chat/:id', [functions.requireLogin], function(req, res) {
    res.render('../view/pages/chat.ejs', {
      sess: sess
    });
  });

  app.use(function(req, res){
    res.render('../view/pages/404error', { title: 'AskToHack - Impossible de trouver la page demandee' });
  });



}
