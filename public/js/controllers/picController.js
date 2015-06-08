angular.module('livepixApp')


.controller('picController',['$scope', '$routeParams','picture',
    function($scope, $routeParams, picture){

        $scope.title = "Single Picture";
        $scope.url = $routeParams.id;
}]);
