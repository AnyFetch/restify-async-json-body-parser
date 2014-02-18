Restify async JSON body parser
==============================

[![Build Status](https://travis-ci.org/Papiel/restify-async-json-body-parser.png?branch=master)](https://travis-ci.org/Papiel/restify-async-json-body-parser)
[![NPM version](https://badge.fury.io/js/anyfetch-file-hydrater.png)](http://badge.fury.io/js/restify-async-json-body-parser)

When using `server.use(restify.bodyParser()`, content is buffered being passed through to `JSON.parse()`.

With very large JSON, this quickly becomes a bottleneck, hanging restify thread while parsing JSON.

This library parses `application/json` requests asynchronously to avoid blocking the main event loop.
All other requests are left unchanged.

Request below a certain size are also sent to the default `bodyParser` for performance.

## Usage

```javascript
var restifyAsyncJsonBodyParser = require('restify-async-json-body-parser');

server.use(restifyAsyncJsonBodyParser());
```

## Options
As for any restify middleware, you can pass `options`.
Those options will get forwarded to the default `bodyParser` if used.

In addition to those options, you may use `minLength` to set a default size (in bytes) before switching to asynchronous. Default is 2500.
