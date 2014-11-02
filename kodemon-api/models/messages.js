var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MessageSchema   = new Schema({
  execution_time : Number,
  timestamp : { type : Date },
  token: String,
  key : String
});

module.exports = mongoose.model('Msg', MessageSchema);
