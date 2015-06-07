var app = angular.module('app',['ngRoute']);


app.config(function($routeProvider) {
    $routeProvider.
        when('/', {templateUrl: 'partials/main.html', controller: 'mainCtrl'})
        .otherwise({ redirecTo: '/' });
})

.controller('mainCtrl', function($scope, $http){
   $scope.title = "Hello Angular"; 
  

   setInterval(function(){
        $http.get('/gallery').success(function(data) {
            console.log('done');
            $scope.gallery = data;
        }).error(function(data, status){
            $scope.gallery = status;
        });
   }, 5000);
});

