var app = angular.module('livepixApp', ['ngRoute','bd.sockjs']);


app.config(function($routeProvider) {

    $routeProvider
        .when('/', {templateUrl: 'partials/main.html', controller: 'mainController'})
        .otherwise({ redirectTo: '/'});

});
