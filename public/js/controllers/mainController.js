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
                console.log('Nouvelle photo ajoutée');
                $scope.gallery.push(newPic.path);
            }

            if (newPic.type === "unlink") {
                console.log('La photo ' + newPic.path + ' a été supprimée');
                $scope.gallery.splice($.inArray(newPic.path,$scope.gallery),1);
            }
        });

        mySocket.setHandler('close', function(msg) {
            console.log('Connection to server failed' || msg);
        });


    
}]);
