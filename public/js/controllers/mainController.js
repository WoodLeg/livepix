angular.module('livepixApp')

.controller('mainController',['$scope','mySocket',
    function($scope, mySocket){
    
        $scope.title = "Hello Angular";
        $scope.gallery = [];
    

        mySocket.setHandler('open', function(){
            console.log('Demand for connection...');
        });
        
        mySocket.setHandler('message', function(pack){
            var newPic = JSON.parse(pack.data);

            if (newPic.type === "add") {
                $scope.gallery.push(newPic.path);
            }
        });

        mySocket.setHandler('close', function(msg) {
            console.log('Connection to server failed' || msg);
        });


    
}]);
