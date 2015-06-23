app = angular.module('livepixApp', ['ngRoute','bd.sockjs','ngMaterial','wu.masonry']);


app.config(function($routeProvider) {
    $routeProvider
        .when('/', {templateUrl: 'partials/main.html', controller: 'mainController'})
        .when('/picture/:id', {templateUrl: 'partials/picture.html', controller: 'picController'})
        .otherwise({ redirectTo: '/'});

});
