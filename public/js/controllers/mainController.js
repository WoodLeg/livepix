angular.module('livepixApp')


.controller('mainController', ['$scope','$http', 'picture',
    function($scope, $http, picture){

        $scope.title = "Livepix App";
        $scope.gallery = [];
        
        $scope.gallery = picture.query();

        setInterval(function(){
            $http({method: 'GET', url:'/gallery'}).success(function(data, status, headers, statusText) {
                console.log('request send');
                $scope.gallery = data; 
            }).error(function(data, status){
                throw status;
          });
        }, 15000);  
    

}]);


