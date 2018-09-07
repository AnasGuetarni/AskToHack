// functions.js

console.log('-> functions.js loaded'.yellow);

const moment = require('moment');
const crypto = require('crypto');

let db = require('./db');
let dataAccess = require('./dataAccess');

module.exports = {

  /** Middleware for limited access and admin interface */
	requireLogin: function(req, res, next) {
		sess=req.session;
		if (sess.username) {
			next();
		} else {
			res.redirect("/signin");
		}
	},

	/** Middleware check session exist */
	notLogged: function(req, res, next){
		var sess = req.session;
		if(sess.username != null){
			res.redirect('/home');
		} else {
			next();
		}
	},

	check_user: function(users, username, password, sess, callback){
		let logged = 0;
		password = crypto.createHash('md5').update(password).digest("hex");
		for (i in users){
			if (username == users[i].username){
				if (password == users[i].password){
					logged++;
					sess.username = users[i].username;
					console.log(sess.username.green + " is connected");
				}
			}
		}
    callback(logged);
	},

	insert_user: function(users, username, password, confirmPassword, callback){
		let logged = 0;
		let errorStatus = false;
		let crypt_password = crypto.createHash('md5').update(password).digest("hex");

		for (var i in users){
			if(errorStatus === false){
				if (users[i].username === username){
					errorStatus = true;
				}
				else if (password !== confirmPassword && users[i].username !== username ) {
						errorStatus = true;
				}
			}
		}

		if(!errorStatus){
				let newUser = new db({
					username : username,
					password : crypt_password
				});
				newUser.save(function(err, Users){
						if(err) {
							console.log("Can't save with error : "+err);
						}
						console.log('User ajouté avec succès ! ');
				});
				logged++
			}
			else {
				console.log('error');
			}
			callback(logged);
	}

}
