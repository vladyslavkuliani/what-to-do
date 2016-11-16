var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var WTD = require('./WTD.js');

var UserSchema = Scema({
  userName: String,
  fullName: String,
  dob: String,
  email: String,
  phoneNumber: Number,
  languages: [String],
  myWTDs: [WTD.schema],
  newWTDs: [WTD.schema],
  followers:[User.schema],
  following: [User.schema]
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
