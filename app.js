global.PORT = 5250;

var express = require('express');
var app = express();

var http = require('http').Server(app);

var session = require('express-session');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var colors = require('colors');

let Parser = require('rss-parser');
let parser = new Parser();

var expiryDate = new Date(Date.now() + 60 * 60 * 1000 );
var dateNow = new Date(Date.now());

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

app.use(session({
	secret: 'u9fdsS4d.#Zd8a/4J*',
	name : 'sesSionId478',
	cookie: { secure: false, httpOnly: true, expires: expiryDate },
	resave: false,
	saveUninitialized: true,
}));

console.log("\nLoading custom modules:".blue);
var db = require('./lib/db');
var types = require('./lib/types/');

http.listen(global.PORT,function(){
    console.log(('\n' + "=== App Started on PORT " + global.PORT + " at " + dateNow + " ===" + '\n').green);
});
