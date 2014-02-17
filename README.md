Restify async JSON body parser
==============================

When using `server.use(restify.bodyParser()`, content is buffered being passed through to `JSON.parse()`.

With very large JSON, this quickly becomes a bottleneck, hanging restify thread while parsing JSON.

This library parses JSON asynchronously to avoid blocking the main event loop.

## Usage

```javascript
server.use(require('restify-async-json-body-parser'));
```
