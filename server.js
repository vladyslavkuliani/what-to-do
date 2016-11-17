var express = require('express');
var app = express();

var db = require('./models');

app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function logInPage(req, res){
  res.sendFile(__dirname + '/view/logInPage.html');
});

app.post('/newAccount', function(req, res){
  var newUser = new db.User({
    userName: req.body.userName,
    fullName: req.body.fullName
  });
  newUser.save();
});

app.get('/logIn', function(req, res){
  db.User.findOne({userName: req.query.userName}, function(err, user) {
    res.json(user);
  });
});

app.get('/profile', function(req, res){
  res.sendFile(__dirname + '/view/index.html');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
