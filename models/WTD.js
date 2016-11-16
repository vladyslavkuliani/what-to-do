var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user.js');

var WTDSchema = Schema({
  date: String,
  city: String,
  time: Date,
  budget: Number,
  with: String,
  joingRequests: [User.schema],
  recommendations:[String]
});

var WTD = mongoose.model('WTD', WTDSchema);
module.exports = WTD;
