var app = angular.module('livepixApp',['ngRoute','ngResource']);


app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: 'partials/main.html', controller: 'mainController'})
            .when('/:id', {templateUrl: 'partials/show.html', controller: 'picController'})
            .otherwise({ redirecTo: '/' });
}])

