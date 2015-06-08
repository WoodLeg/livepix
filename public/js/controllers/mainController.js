angular.module('livepixApp')


.controller('mainController', ['$scope','$http',
    function($scope, $http){

        $scope.title = "Hello Angular";
        $scope.gallery = [];

        setInterval(function(){
            $http.get('/gallery').success(function(data) {
                console.log('done');
                $scope.gallery = data;
            }).error(function(data, status){
                throw status;
            });
        }, 5000);  
    

}]);


