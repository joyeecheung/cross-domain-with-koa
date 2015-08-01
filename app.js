'use strict';

// Requires
var koa = require('koa');

var serve = require('koa-static');
var Router = require('koa-router');
var logger = require('koa-logger');
var views = require('koa-views');


var jsonp = require('koa-jsonp');
var cors = require('koa-cors');

/******************************************************
 * Initialize application
 ******************************************************/
var app = module.exports = koa();
app.use(logger());
app.use(views('./views', { default: 'jade' }));

/** Define public path, for css/js/images **/
app.use(serve(__dirname + '/public'));

function *getThings() {
  this.body = {
    id: this.params.id,
    content: 'ABCD',
    title: 'EFGH'
  }
}

function *isJSON(next) {
  this.type = 'json';
  yield next;
}

var apiRouter = new Router({
  prefix: '/api'
});
var router = new Router();

apiRouter.get('/jsonp/:id',
              jsonp({callbackName: '_cb'}), getThings);
apiRouter.get('/cors/:id', cors(), isJSON, getThings);
apiRouter.get('/normal/:id', isJSON, getThings);

router.get('/', function *() {
  return yield this.render('index');
});

app.use(apiRouter.routes());
app.use(router.routes());

/******************************************************
 * Handle Error 404 and 500
 ******************************************************/
app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
    this.status = 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
});

/******************************************************
 * Start server
 ******************************************************/
var port = process.env.PORT || 80;
app.listen(port);
console.log('Running server at: http://localhost:%d', port);
