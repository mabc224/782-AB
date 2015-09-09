/**
 * index.js
 * Default description.
 *
 * @author Arsalan Bilal <mabc224gmail.com>
 */

var request = require('supertest');
var expect = require('chai').expect;
var Channel = require('../schema/channel');

var db = require('./db');
var app = require('../bin/www');


describe('Check channels functionality', function () {

    //beforeEach(db.drop);

    it('should insert fake data', function (done) {
        request(app)
            .get('/')
            .expect(200, done);
    });

    describe('Search tv functionality', function () {
        beforeEach(function (done) {
            var modelObj = new Channel({
                name: 'ChannelOne',
                location: {
                    type: 'Point',
                    coordinates: [-142.2452, -12.5151]
                },
                ip: '172.168.0.1'
            });

            modelObj.save(done);
        });

        it('should search tv channel by lat/lng', function (done) {
            request(app)
                .get('/channels')
                .send({
                    l: '-142.2452, -12.5151'
                })
                .expect(function (response) {
                    expect(response.status).to.equal(200);
                }).end(done);
        });
    });
});

