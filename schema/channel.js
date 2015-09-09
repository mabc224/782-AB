/**
 * checkin.js
 * Schema File for channel
 *
 * @author Arsalan Bilal <mabc224gmail.com>
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var channelSchema = new Schema({
    name: String,
    location: { // GeoJSON Point
        type: { type: String, default: "Point"},
        coordinates: [Number]
    },
    ip: String
});

channelSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('channel', channelSchema);

