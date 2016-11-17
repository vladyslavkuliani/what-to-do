var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WTDSchema = Schema({
  date: String,
  city: String,
  time: Date,
  budget: Number,
  with: String,
  recommendations:[String]
});

var WTD = mongoose.model('WTD', WTDSchema);
module.exports = WTD;
