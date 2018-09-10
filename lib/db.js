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

var RoomsSchema = mongoose.Schema({
    name: String,
    description: String,
    picture: String
});

var Users = mongoose.model('Users', UsersSchema);
var Rooms = mongoose.model('Rooms', RoomsSchema);

module.exports = Users;
