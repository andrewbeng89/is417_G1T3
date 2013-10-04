var webSocketsApp = angular.module('WebSocketsApp', []);

webSocketsApp.controller('SocketsController', function($scope, $http) {

    // Array representing the list of messages
    $scope.messages = [];
    
    var socket = io.connect('/');
    socket.on('message', function(data) {
        console.log({
        	incoming: data
        });
        $scope.messages.push(data);
        $scope.$apply();
        console.log($scope.messages)
        socket.emit('reply', {
            reply : new Date()
        });
    });

});