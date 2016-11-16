var express = require('express');
var app = express();

var db = require('./models');

app.use(express.static('public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function logInPage(req, res){
  res.sendFile(__dirname + '/view/logInPage.html');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
