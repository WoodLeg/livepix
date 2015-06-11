angular.module('livepixApp')


.controller('picController', ['$scope','$routeParams', 
    function($scope, $routeParams) {
    
    $scope.src = '/gallery/'+ $routeParams.id;

}]);
