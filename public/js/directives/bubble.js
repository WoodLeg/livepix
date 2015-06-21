angular.module('livepixApp')

.directive('bubble',function($mdMedia) {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            scope.$watch(function() {
                return $mdMedia('sm');
            }, function(small) {
                if (small) {
                    scope.bubble.direction = "right";
                    elem.addClass('lock-size-col');
                    elem.removeClass('lock-size-row-md');
                } else {
                    scope.bubble.direction = "down";
                    elem.addClass('lock-size-row-md');
                    elem.removeClass('lock-size-col');
                }   
            });
            scope.$watch(function() {
                return $mdMedia('md');
            }, function(medium) {
                if (medium) {
                    elem.addClass('lock-size-row-md');
                    elem.removeClass('lock-size-row');
                } else {
                    elem.addClass('lock-size-row');
                    elem.removeClass('lock-size-row-md');
                }
            });
        }
    }
});
