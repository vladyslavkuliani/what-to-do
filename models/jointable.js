var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JoinTableSchema = Schema({
  followerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  followedId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

var JoinTable = mongoose.model('JoinTable', JoinTableSchema);
module.exports = JoinTable;
