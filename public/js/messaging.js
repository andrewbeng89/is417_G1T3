var webSocketsApp = angular.module('WebSocketsApp', []);

webSocketsApp.controller('SocketsController', function($scope, $http) {

    // Array representing the list of messages
    $scope.messages = [];
    
    var socket = io.connect('/');
    socket.on('message', function(data) {
        data.message = new Date().getTime() - data.message;
        $scope.messages.push(data);
        $scope.$apply();
        /*socket.emit('reply', {
            reply : data.message
        });*/
    });

});