'use strict';

var restify = require('restify');
var async = require('async');
var JSONStream = require('JSONStream');


var asyncJsonBodyParser = function(options) {
    options = options || {};
    // Below this size, we keep using the default JSON parser.
    // Note that chunked transfer will also be parsed using default restify parser
    options.minLength = options.minLength || 1000;

    var bodyParser = function(req, res, next) {
        req.once('error', next);
        var override = options.overrideParams;

        var stream = JSONStream.parse();
        req.pipe(stream);

        stream.on('root', function(params) {
            if (options.mapParams !== false) {
                if (Array.isArray(params)) {
                    req.params = params;
                } else if (typeof (params) === 'object') {
                    Object.keys(params).forEach(function(k) {
                        var p = req.params[k];
                        if (p && !override) {
                            return false;
                        }
                        req.params[k] = params[k];
                        return true;
                    });
                } else {
                    req.params = params;
                }
            } else {
                req._body = req.body;
            }

            req.body = params;

            next();
        });

        stream.once('error', function() {
            return next(new restify.InvalidContentError('Invalid JSON.'));
        });
    };

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
