var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  profilePicture: String,
  userName: String,
  fullName: String,
  dob: String,
  email: String,
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

var User = mongoose.model('User', UserSchema);
module.exports = User;
