'use strict';

require("should");

var restify = require('restify');
var asyncJsonBodyParser = require('../lib/async_json_body_parser');

var request = require('supertest');

function expectPayload(payload) {
    return function(res) {
        res.body.should.eql(payload);
    };
}

describe("Async JSON body parser", function() {
    var server = restify.createServer();
    server.use(asyncJsonBodyParser());
    server.post('/', function(req, res, next) {
        res.send(req.params);
        next();
    });

    it("should handle application/x-www-form-urlencoded requests", function(done) {
        request(server)
            .post('/')
            .send("something=foo")
            .send("somethingelse=base")
            .expect(200)
            .expect(expectPayload({
                something: "foo",
                somethingelse: "base"
            }))
            .end(done);
    });

    it("should handle simple application/json requests", function(done) {
        var payload = {};
        request(server)
            .post('/')
            .send(payload)
            .expect(200)
            .expect(expectPayload(payload))
            .end(done);
    });

    it("should handle long application/json requests", function(done) {
        var payload = {};
        var arbitraryContent = require('fs').readFileSync(__filename).toString();

        for(var i = 0; i <= 100; i += 1) {
            payload["a-key-" + i] = arbitraryContent;
        }

        request(server)
            .post('/')
            .send(payload)
            .expect(200)
            .expect(expectPayload(payload))
            .end(done);
    });
});
