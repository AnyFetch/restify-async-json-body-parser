Restify async JSON body parser
==============================

[![Build Status](https://travis-ci.org/Papiel/restify-async-json-body-parser.png?branch=master)](https://travis-ci.org/Papiel/restify-async-json-body-parser)
[![NPM version](https://badge.fury.io/js/anyfetch-file-hydrater.png)](http://badge.fury.io/js/restify-async-json-body-parser)

When using `server.use(restify.bodyParser()`, content is buffered being passed through to `JSON.parse()`.

With very large JSON, this quickly becomes a bottleneck, hanging restify thread while parsing JSON.

This library parses JSON asynchronously to avoid blocking the main event loop.

## Usage

```javascript
var restifyAsyncJsonBodyParser = require('restify-async-json-body-parser');

server.use(restifyAsyncJsonBodyParser());
```
