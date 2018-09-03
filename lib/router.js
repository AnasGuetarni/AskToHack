console.log('-> router.js loaded'.yellow);

var fs = require('fs');

var Users = require('./db');
var dataAccess = require('./dataAccess');

var session = require('express-session');
var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var formidable = require('formidable');
var path = require('path');
var sess;

module.exports = function(app){

  app.get('/', function(req, res, next) {
    sess = req.session;
    var erreur = false;
    if (req.query.failed)
      erreur = true;
      res.render('../view/pages/welcome.ejs', {
        erreur: erreur
      });
  });

  app.get('/signin', function(req, res) {
    res.render('../view/pages/signin.ejs', {
    });
  });

  app.post('/signin', function(req, res) {
    sess = req.session;
    sess.username = req.body.username;
    sess.password = req.body.password;
    console.log(sess);
    dataAccess.findAll(function(users){
      for (var i in users){
        if (users[i].username !== req.body.username){
          res.end();
        }
        else if (users[i].password !== req.body.password) {
          res.end();
        }
        else if (users[i].username === req.body.username && users[i].password === req.body.password) {
          res.redirect('/home');
        }
        else {
          res.end();
        }
      }
    });
  });

  app.get('/signup', function(req, res) {
    res.render('../view/pages/signup.ejs', {

    });
  });

  app.post('/signin', function(req, res) {
    var error = false;

    dataAccess.findAll(function(users){
      for (var i in users){
        if (users[i].username !== req.body.username){
          error = true;
        }
        else if (users[i].password !== req.body.password) {
          error = true;
        }
        else if (users[i].username === req.body.username && users[i].password === req.body.password) {
          res.redirect('/home');
        }
        else {
          error = true;
        }
      }
    });

    if (error) {
      res.render('../view/pages/404error', { title: 'AskToHack - Impossible de trouver la page demandee' });
    }
  });

  app.get('/home', function(req, res) {
    res.render('../view/pages/home.ejs', {
      sess: sess
    });
  });

  app.use(function(req, res){
    res.render('../view/pages/404error', { title: 'AskToHack - Impossible de trouver la page demandee' });
  });



}
