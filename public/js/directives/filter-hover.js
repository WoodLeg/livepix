angular.module('livepixApp')

.directive('filterHover', ['bigPicture',
    function(bigPicture) {
        return {
            restrict : 'A',
            controller: function($scope, bigPicture) {
                $scope.changeBig = function(src){
                    bigPicture.change = src;
                }
            }
        }
    }
]);
