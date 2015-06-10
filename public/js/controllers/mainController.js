angular.module('livepixApp')

.controller('mainController',['$scope','mySocket',
    function($scope, mySocket){
    
        $scope.title = "Hello Angular";

        mySocket.setHandler('open', function(){
            console.log('Demand for connection...');
        });
        
        mySocket.setHandler('message', function(pack){
            console.log(pack.data);
        });

        mySocket.setHandler('close', function(msg) {
            console.log('Connection to server failed' || msg);
        });
    
}]);
