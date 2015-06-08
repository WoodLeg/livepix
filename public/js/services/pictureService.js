angular.module('livepixApp')


.factory('picture', function pictureFactory($resource) {
    return $resource('/gallery/:id', {}, {});
});
