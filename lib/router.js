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

  app.get('/', [functions.notLogged], function(req, res, next) {
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
    //var sess = req.session;
    dataAccess.findAll(function(users){
      functions.check_user(users, req.body.username, req.body.password, req.session, function(logged){
        if (logged>=1) {
          res.redirect('/home');
        }
        else res.redirect('/signin?failed=true');
      });
    });
  });

  app.get('/signup', [functions.notLogged], function(req, res) {
    console.log('get rendering signup');
    res.render('../view/pages/signup.ejs', {

    });

  });

    app.post('/signup', [functions.notLogged], function(req, res) {
      let username = req.body.username;
      let password = req.body.password;
      let confirmPassword = req.body.confirmPassword;
      let errorStatus = false ;
      console.log("post rendering signup");
      dataAccess.findAll(function(users){
        for (var i in users){
          if(errorStatus === false){
            if (users[i].username === username){
              console.log(" user :"+users[i].username+" already in database ("+username+")" );
              errorStatus = true;
            }
            else if (password !== confirmPassword && users[i].username !== username ) {
                console.log("password and confirmPassword not equals");
                errorStatus = true;
            }
          }
        }

        if(!errorStatus){
            let newUser = new Users({
              username : username,
              password : password
            });
            newUser.save(function(err, Users){
                if(err) {
                  console.log("can't save with error : "+err);
                }
                console.log('User ajouté avec succès ! ');

            });
            res.redirect('/home');
          }
          else {
            console.log('error');
            res.redirect('/signup');
          }
      });
      console.log("sortie de fonction");
    });

  app.get('/home', [functions.requireLogin], function(req, res) {
    res.render('../view/pages/home.ejs', {
      sess: req.session
    });
  });

  app.get('/chat/:id', [functions.requireLogin], function(req, res) {
    res.render('../view/pages/chat.ejs', {
      sess: req.session
    });
  });

  app.use(function(req, res){
    res.render('../view/pages/404error', { title: 'AskToHack - Impossible de trouver la page demandee' });
  });



}
