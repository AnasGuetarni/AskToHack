// functions.js

console.log('- functions.js loaded'.yellow);

var db = require('./db');
var dataAccess = require('./dataAccess');
var moment = require('moment');

module.exports = {

  /** Middleware for limited access and admin interface */
	requireLogin: function(req, res, next) {
		sess=req.session;
		if (sess.username) {
			next();
		} else {
			res.redirect("/");
		}
	},

	check_user: function(users, username, password, sess, callback){
		var logged = 0;
		for (i in users){
			if (username == users[i].username){
				if (password == users[i].password){
					logged++;
					sess.username = users[i].username;
					sess.password = users[i].password;
					console.log(sess.username.green + " is connected");
				}
			}
		}
    callback(logged);
	}

}

/*
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
*/
