angular.module('livepixApp')


.controller('picController', ['$scope','$routeParams', '$mdDialog',
    function($scope, $routeParams, $mdDialog) {
    
    var src = '/gallery/'+ $routeParams.id;
    $scope.src = src;

    $scope.printIt = function($event) {
        var par = angular.element(document.body);
        
        $mdDialog.show({
            parent: par,
            targetEvent: $event,
            template:
                '<md-dialog aria-label="Test">' + 
                '   <md-dialog-content>' + 
                '       <p> Printing {{ picName }} </p> ' +
                '   </md-dialog-content>' +
                '   <div class="md-actions">' +
                '       <md-button ng-click="closeDialog()" class="md-primary">' +
                '           Close' +
                '       </md-button>' +
                '   </div>' +
                '</md-dialog>',
            controller: DialogController
        });
        function DialogController($scope, $mdDialog, $routeParams){ 
            $scope.picName = $routeParams.id;
            $scope.closeDialog = function() {
                $mdDialog.hide();
            }
        }


       
    };

    $scope.mailIt = function() {
        alert('Mailing ' + $scope.src);
    };
}]);
