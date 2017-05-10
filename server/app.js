//requires
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//USES
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 27017 is default mongo port
//mongoose stuff
mongoose.connect('localhost:27017/meanie');

// the schema
var ourSchema = mongoose.Schema({ //does not need to be new mongoose.schema
  name: String,
  location: String
}); //end schema

//model
var ourModels = mongoose.model('ourModels', ourSchema); //needs to be plural

//globals
var port =process.env.PORT || 8080;

//server spin up
app.listen(port, function(req, res) {
  console.log('listening on 8080:', port);   //req res not needed
});

//route
app.get('/', function(req, res) {
  res.sendFile(path.resolve('public/index.html'));
});

//GET
app.get('/getRecords', function(req, res) {
  // get and send back all the things
  console.log('in GET route:');
  ourModels.find().then(function(data) {
    res.send(data);
  }); //end ourModel
}); //end GET

app.post('/testPost', function(req, res) {
  console.log('req.body.name: ' + req.body.name);
  console.log('in POST route:');
  // retrieved the req.body
  // putting it into an object to be saved in the db
  var recordToAdd = {
    name: req.body.name,
    location: req.body.location
  };
  // create new record
  var newRecord = ourModels(recordToAdd);
  newRecord.save().then( function(){
    res.sendStatus( 200 );
  }); //end save newRecord
}); //end POST
