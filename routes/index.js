var express = require('express');
var router = express.Router();
var channelSchema = require("../schema/channel");
var Faker = require('Faker');
var _ = require('lodash');
var ip = require('ip');

router.get('/', function(req, res){

  var limitRecord = 10;
  var countRecord = 0;

  function callback(err, doc){
    countRecord++;
    if(err){
      console.log('Error occured in inserting dummy data' );
      console.error(err, err.message);
      return res.end();
    } else {
      if(limitRecord === countRecord){
        res.send("server is working and fake data is inserted");
      } else {
        insertData();
      }
    }
  }


  var insertData = function() {

    var modelObj = new channelSchema({
      name: Faker.Internet.userName(),
      location: {
        type: 'Point',
        coordinates: [Faker.Address.longitude(), Faker.Address.latitude() ]
      },
      ip: Faker.Internet.ip()
    });

    modelObj.save(callback);
  };

  insertData();

});

/*
 * save location with username
 */


/*
 * get all location with username
 */

router.get('/data', function(req, res, next) {

  channelSchema.find({},{_id: 0, __v: 0}, function(err, data){
    if(err){
      return res.json({});
    }
    return res.json(data);
  });

});

/*
 * get all location with location
 */

router.get('/channels', function(req, res, next) {

  if (req.query.l) {
    var query = req.query.l;
    var split = query.split(',');

    if (split.length === 2) {

      var lat = parseFloat(split[0]);
      var lng = parseFloat(split[1]);

      // http://docs.mongodb.org/manual/reference/command/geoNear/
      channelSchema.geoNear({
        type: "Point",
        coordinates: [
          lat,
          lng
        ]
      }, {
        spherical: true,
        maxDistance: 1 / 6378137,
        distanceMultiplier: 6378137
      })
          .then(function (docs) {

            var names = _.map(docs, function (n) {
              return n.obj.name
            });

            res.json(names);
          });
    } else if (split.length === 1) {
      var ip = query || req.headers['x-forwarded-for'] ||
          req.connection.remoteAddress ||
          req.socket.remoteAddress ||
          req.connection.socket.remoteAddress;

      channelSchema.findOne({ip: ip}, {_id: 0, __v: 0}, function (err, data) {
        if (err) {
          return res.json({});
        }
        if (!data) {
          return res.json({});
        }
        channelSchema.geoNear({
          type: "Point",
          coordinates: data.location.coordinates
        }, {
          spherical: true,
          maxDistance: 1 / 6378137,
          distanceMultiplier: 6378137
        })
            .then(function (docs) {

              var names = _.map(docs, function (n) {
                return n.obj.name
              });

              res.json(names);
            });

        return res.json(data);
      });
    }
  } else {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    channelSchema.findOne({ip: ip}, {_id: 0, __v: 0}, function (err, data) {
      if (err) {
        return res.json({});
      }
      if (!data) {
        return res.json({});
      }
      channelSchema.geoNear({
        type: "Point",
        coordinates: data.location.coordinates
      }, {
        spherical: true,
        maxDistance: 1 / 6378137,
        distanceMultiplier: 6378137
      })
          .then(function (docs) {

            var names = _.map(docs, function (n) {
              return n.obj.name
            });

            res.json(names);
          });

      return res.json(data);
    });
  }
});

module.exports = router;
