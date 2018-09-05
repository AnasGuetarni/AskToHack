var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/asktohack";

mongoose.connect(url, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function (){
    console.log("Connexion à la base OK".yellow);
});

var UsersSchema = mongoose.Schema({
    username: String,
    password: String
});
/*
var ChatSchema = mongoose.Schema({
    name: String,
    username: String
});

var CommandSchema = mongoose.Schema({
    name: String,
    params: String
});
*/
var Users = mongoose.model('Users', UsersSchema);
//var Chats = mongoose.model('Chats', ChatSchema);
//var Commands = mongoose.model('Commands', CommandSchema);

module.exports = Users;
//module.exports = Chats;
//module.exports = Commands;
