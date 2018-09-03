var mongoose = require('mongoose');
var url = "mongodb://localhost:27017/asktohack";

mongoose.connect(url, { useNewUrlParser: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur lors de la connexion'));
db.once('open', function (){
    console.log("Connexion à la base OK");
});

var UsersSchema = mongoose.Schema({
    id: String,
    username: String,
    password: String
});

var Users = mongoose.model('Users', UsersSchema);


module.exports = Users;
