var mongoose = require('mongoose');

var Note = mongoose.model('Note', {
  title : String,
  description : String
});
module.exports = Note;
