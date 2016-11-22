var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Recommendation = require('./recommendations.js');

var WTDSchema = Schema({
  city: String,
  timeStart: String,
  timeEnd: String,
  budget: Number,
  withWho: String,
  details: String,
  recommendations:[Recommendation.schema]
});

var WTD = mongoose.model('WTD', WTDSchema);
module.exports = WTD;
