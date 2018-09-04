global.PORT = 5250;

var express = require('express');
var app = express();

var http = require('http').Server(app);

var session = require('express-session');
var helmet = require('helmet');
var bodyParser = require('body-parser');
var colors = require('colors');
var path = require('path');

let Parser = require('rss-parser');
let parser = new Parser();

var expiryDate = new Date(Date.now() + 60 * 60 * 1000 );
var dateNow = new Date(Date.now());

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/public")));
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
var router = require('./lib/router')(app);
var dataAccess = require('./lib/dataAccess');
var socket = require('./lib/socket')(http);
var functions = require('./lib/functions');

http.listen(global.PORT,function(){
    console.log(('\n' + "=== App Started on PORT " + global.PORT + " at " + dateNow + " ===" + '\n').green);
});
