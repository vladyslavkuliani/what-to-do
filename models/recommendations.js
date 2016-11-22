var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecommendationsSchema = Schema({
  userProfilePicture: String,
  comment: String
});

var Recommendation = mongoose.model('Recommendation', RecommendationsSchema);
module.exports = Recommendation;
