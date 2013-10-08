var socket = require('socket.io-client').connect('localhost', {
    port: 3001
});
var messages = [];
socket.on('connect', function(){
	socket.on('message', function(data) {
		data.message = new Date().getTime() - data.message;
		console.log(data.message);
	});
});