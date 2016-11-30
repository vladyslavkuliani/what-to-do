var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = Schema({
  email: String,
  passwordDigest: String,
  profilePicture: String,
  userName: String,
  firstName: String,
  lastName: String,
  dob: String,
  phoneNumber: Number,
  languages: [String],
  myWTDs: [{
    type: Schema.Types.ObjectId,
    ref: 'WTD'
  }],
  newWTDs: [{
    type: Schema.Types.ObjectId,
    ref: 'WTD'
  }],
  followers:[{
    type: Schema.Types.ObjectId,
    ref: 'JoinTable'
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'JoinTable'
  }]
});

UserSchema.statics.createSecure = function(email, password, firstName, lastName, callback){
  var UserModel = this;

  bcrypt.genSalt(function(err, salt){
    bcrypt.hash(password, salt, function(err, hash){
      UserModel.create({
        profilePicture: '../images/defaultProfilePicture.jpg',
        email:email,
        passwordDigest:hash,
        firstName: firstName,
        lastName: lastName
      }, callback);
    });
  });
};

UserSchema.methods.checkPassword = function (password) {
  // run hashing algorithm (with salt) on password user enters in order to compare with `passwordDigest`
  return bcrypt.compareSync(password, this.passwordDigest);
};

// authenticate user (when user logs in)
UserSchema.statics.authenticate = function (email, password, callback) {
 // find user by email entered at log in
 // remember `this` refers to the User for methods defined on userSchema.statics
 this.findOne({email: email}, function (err, foundUser) {
   console.log("USER: ", foundUser);

   // throw error if can't find user
   if (!foundUser) {
     console.log('No user with email ' + email);
     callback("Error: no user found", null);  // better error structures are available, but a string is good enough for now
   // if we found a user, check if password is correct
   } else if (foundUser.checkPassword(password)) {
     callback(null, foundUser);
   } else {
     callback("Error: incorrect password", null);
   }
 });
};


var User = mongoose.model('User', UserSchema);
module.exports = User;
