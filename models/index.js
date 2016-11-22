var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/what-to-do");

module.exports.User = require('./user.js');
module.exports.WTD = require('./WTD.js');
module.exports.JoinTable = require('./jointable.js');
module.exports.Recommendation = require('./recommendations.js');
