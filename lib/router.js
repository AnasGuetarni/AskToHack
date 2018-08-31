console.log('-> router.js loaded'.yellow);

var fs = require('fs');
//var functions = require('./functions');
//var dataAccess = require('./dataAccess');
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
      res.render('../view/pages/login.ejs', {
        title: 'Academy Geneva - Connexion',
        erreur: erreur,
      });
  });

  app.post('/login', function(req, res){
    res.redirect('/home');
  });

  app.use(function(req, res){
    res.render('../view/pages/404error', { title: 'Academy Geneva - Impossible de trouver la page demandee' });
  });



}
