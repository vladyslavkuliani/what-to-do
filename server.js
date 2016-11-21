var express = require('express');
var app = express();

var db = require('./models');

var session = require('express-session');
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: 'SuperSecretCookie',
    cookie: {
        maxAge: 30 * 60 * 1000
    } // 30 minute cookie lifespan (in milliseconds)
}));

var hbs = require('express-hbs');
app.engine('hbs', hbs.express4({
    partialsDir: __dirname + '/view'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/view');

app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function logInPage(req, res) {
    res.sendFile(__dirname + '/view/logInPage.html');
});

app.post('/newAccount', function(req, res) {
    var newUser = new db.User({
        profilePicture: "../images/defaultProfilePicture.jpg",
        userName: req.body.userName,
        fullName: req.body.fullName
    });
    newUser.save();
});

app.get('/logIn', function(req, res) {
    db.User.findOne({
        userName: req.query.userName
    }, function(err, user) {
        req.session.userId = user._id;
        res.json(user);
    });
});

app.get('/userId', function(req, res){
  db.User.findOne({_id: req.session.userId}, function(err, user){
    res.json(user);
  });
});

app.get('/profile/:id', function(req, res) {
    db.User.findOne({_id: req.params.id}).populate('myWTDs').exec(function(err, user) {
        res.render('index', {user: user});
    });
});

app.post('/createWTD', function(req, res) {
    var newWTD = new db.WTD({
        city: req.body.city,
        // timeStart: req.query.timeStart,
        // timeEnd: req.query.timeEnd,
        budget: req.body.budget,
        with: req.body.with,
        details: req.body.details
    });
    newWTD.save();

    console.log(req.body.userId);
    db.User.findOne({_id: req.body.userId}, function(err, user) {
      if(err) {return console.log("ERROR!!!");}
        user.myWTDs.unshift(newWTD._id);
        user.save();

        db.WTD.findOne({_id: user.myWTDs[0]}, function(err, wtd){
          if(err){return console.log("WTD ERROR!");}
          res.render('newWTD', {wtd: wtd, user: user});
        });
    });
});

app.post('/delete-post', function(req, res){
  console.log(req.body.wtdId);
  db.User.findOne({_id: req.body.userId},function(err, user){
    if(err){return console.log(err);}
    var index = user.myWTDs.indexOf(req.body.wtdId);
    user.myWTDs.splice(index, 1);
    user.save();
  });

  db.WTD.find({_id: req.body.wtdId}, function(err, wtd){
    db.WTD.remove({_id: req.body.wtdId}, function(err, deleted){
      if(err){return console.log("ERROR!");}
    });
    res.json(wtd);
  });
});

app.get('/find-friends', function(req, res){
  var usersButMe = [];
  db.User.find({}, function(err, users){
    users.forEach(function(user){
      if(user._id != req.session.userId){
        usersButMe.push(user);
      }
    });

    res.render('searchUsers', {users: usersButMe});
  });
});

app.get('/user', function(req, res){
  db.User.findOne({_id:req.session.userId}, function(err, user){
    res.json(user);
  });
});

app.listen(process.env.PORT || 3000, function() {
    console.log('Express server is running on http://localhost:3000/');
});
