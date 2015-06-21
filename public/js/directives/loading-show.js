angular.module('livepixApp')


.directive('loadingShow', function() {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            scope.$watch(function() {
                return scope.loading;
            }, function(loading) {
                if (!scope.loading) {
                    elem.detach();
                }

            });

            console.log(scope.filterGallery);
        }
    }
});
