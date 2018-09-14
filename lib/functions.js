// functions.js

console.log('-> functions.js loaded'.yellow);

const moment = require('moment');
const crypto = require('crypto');

let data = require('./db');
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
				let newUser = new data.modelUsers({
					username : username,
					password : crypt_password
				});
				newUser.save(function(err, Users){
						if(err) {
							console.log("Can't save with error : "+err);
						}
				});
				logged++
			}
			else {
				console.log('error');
			}
			callback(logged);
	},



			insert_room: function(rooms, roomName, roomDesc, callback){
				let bool = 0;
				let errorStatus = false;
				if(roomName === "" || roomName === false || roomName === undefined)
					errorStatus = true;
				if(roomName === "" || roomName === false || roomName === undefined)
					roomName = "";

				for (var i in rooms){
					if(errorStatus === false){
						if (rooms[i].name === roomName){
							errorStatus = true;
						}
					}
				}
				if(!errorStatus){
						let newRoom = new data.modelRooms({
							name : roomName,
							desc : roomDesc,
							pic : "img/hacker.jpg"
						});
						newRoom.save(function(err, Rooms){
								if(err) {
									console.log("Can't save with error : "+err);
								}
						});
						bool++;
					}
				else {
					if(roomName !== "")
					console.log("[[Server]] error add room -> room \""+roomName+"\" already exist");
					else
					console.log("[[Server]] error : room name not renseigned");
				}
					callback(bool);
			},

			delete_room: function(roomName, callback){
				let bool = 0;
				let errorStatus = false;
				data.modelRooms.deleteOne({ name:roomName}, function(err){
					if(!err){
						bool = 1;
						console.log("[[server] -> room deleted]");
					}
					else{
						console.log("[[server]] -> room not deleted");
					}
					callback(bool);
				});
			}


}
