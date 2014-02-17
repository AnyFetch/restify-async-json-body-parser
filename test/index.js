'use strict';

var restify = require('restify');
var asyncJsonBodyParser = require('../lib/async_json_body_parser');

describe("Async JSON body parser", function() {
    var server = restify.createServer();
    server.use(restify.bodyParser());

    it("should handle form requests", function(done) {
        done();
    });
});
