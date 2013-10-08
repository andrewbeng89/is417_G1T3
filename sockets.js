
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , connect = require('connect');

var app = express();

var cookieParser = express.cookieParser('team-succinq')
  , sessionStore = new connect.middleware.session.MemoryStore();

app.configure(function(){
  app.set('port', process.env.PORT || 3001);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(cookieParser);
  app.use(express.session({
    store : sessionStore
  }));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function (req, res) {
  res.redirect('/index.html');
});
app.get('/users', user.list);

var server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
  console.log("node.js debug log");
});

io.configure('development', function(){
  io.enable('browser client minification');
  // send minified client
  io.enable('browser client etag');
  // apply etag caching logic based on version number
  io.enable('browser client gzip');
// gzip the file
/*'websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling'*/
  io.set('transports', ['websocket']);
});

io.sockets.on('connection', function (socket) {
  for (var i = 0; i < 1000; i++) {
    socket.emit('message', { message: new Date().getTime() });
  };
  socket.on('reply', function (data) {
    console.log(data);
  });
});