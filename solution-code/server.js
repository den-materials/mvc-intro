//Set up Express
var express = require('express');
var app = express();

//Set up bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//Set up DB
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/airplanes");
var Schema = mongoose.Schema;
var NerdSchema = new Schema({
    title: String,
    name: String
});
var Nerd = mongoose.model('Nerd', NerdSchema);

//Set up EJS
app.set('views', __dirname);
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

//Nerd form
app.get('/nerds/new', function(req, res) {
	res.sendFile(__dirname+'/newNerd.html');
});

//Add new nerd
app.post('/nerds', function(req, res) {
	Nerd.create({name: req.body.name, title: req.body.title}, function(error, nerd) {
		res.render('nerd_show', {nerd: nerd});
	});
});

//Start server
app.listen(3000, function() {
	console.log("Listening at http://localhost:3000");
});