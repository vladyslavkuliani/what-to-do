var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WTDSchema = Schema({
  city: String,
  timeStart: String,
  timeEnd: String,
  budget: Number,
  with: String,
  details: String,
  recommendations:[String]
});

var WTD = mongoose.model('WTD', WTDSchema);
module.exports = WTD;
