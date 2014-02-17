'use strict';

var restify = require('restify');
var async = require('async');


var asyncJsonBodyParser = function(req, res, next) {
    var contentType = req.contentType();
    if(true || req.contentType() !== "application/json") {
        // Not JSON, use restify default flow
        async.eachSeries(restify.bodyParser(), function(fn, cb) {
            fn(req, res, cb);
        }, next);
    }
};

module.exports = asyncJsonBodyParser;
