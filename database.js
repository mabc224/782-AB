/**
 * database.js
 * Default description.
 *
 * @author Arsalan Bilal <mabc224gmail.com>
 * @created 18/8/2015
 */

var mongoose = require("mongoose");

module.exports.connect = function(app){
    app.set('database', 'channelDb');
    app.set('host', '127.0.0.1');

    app.set('url', 'mongodb://'+app.get('host')+'/'+ app.get('database'));
    mongoose.connect(app.get('url'));
    console.log('Connected To Mongo With Url: ' +  app.get('url'));
}


