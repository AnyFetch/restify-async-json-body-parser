'use strict';

var restify = require('restify');
var async = require('async');
var JSONStream = require('JSONStream');


var bodyParser = function(req, res, next) {
    req.once('error', next);

    var stream = JSONStream.parse();
    req.pipe(stream);

    stream.on('root', function(root) {
        req.params = root;
        req.body = root;

        next();
    });

    stream.once('error', function() {
        return next(new restify.InvalidContentError('Invalid JSON.'));
    });
};


var asyncJsonBodyParser = function(options) {
    options = options || {};
    // Below this size, we keep using the default JSON parser.
    // Note that chunked transfer will also be parsed using default restify parser
    options.minLength = options.minLength || 1000;


    return function(req, res, next) {
        var parsers = [];

        if(req.getContentLength() < options.minLength || req.contentType() !== "application/json") {
            // Not JSON, use restify default flow
            parsers = restify.bodyParser();
        }
        else {
            parsers = [bodyParser];
        }

        async.eachSeries(parsers, function(fn, cb) {
            fn(req, res, cb);
        }, next);
    };
};


module.exports = asyncJsonBodyParser;
