var mongoose = require('mongoose');

var DB = {};

DB.drop = function(done) {
  mongoose.connection.db.dropDatabase();
  done();
};

module.exports = exports = DB;
