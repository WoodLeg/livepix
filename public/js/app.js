var app = angular.module('livepixApp', ['ngRoute']);


app.config(function($routeProvider) {

    $routeProvider
        .when('/', {templateUrl: 'partials/main.html', controller: 'mainController'})
        .otherwise({ redirectTo: '/'});

});
