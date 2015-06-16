angular.module('livepixApp')


.controller('picController', ['$scope','$routeParams', '$mdDialog',
    function($scope, $routeParams, $mdDialog) {
    
    $scope.originalSrc = '/gallery/'+ $routeParams.id;    
    
    $scope.printIt = function($event) { 
        var par = angular.element(document.body);
        $mdDialog.show({
            parent: par,
            targetEvent: $event,
            template:
                '<md-dialog aria-label="Print">' + 
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

    $scope.mailIt = function($event) {
        var par = angular.element(document.body);
        $mdDialog.show({
            parent: par,
            targetEvent: $event,
            templateUrl: 'partials/templates/mailDialogForm.html',
            controller: DialogController
        });
        function DialogController($scope, $mdDialog, $routeParams){ 
            $scope.picName = $routeParams.id;
            $scope.closeDialog = function() {
                $mdDialog.hide();
            }
            $scope.send = function(mail) {
                alert("Photo envoyé à " + mail);
                $mdDialog.hide();
            }
        } 
    };

    var filters = ['sinCity','sunRise','love','grungy','hazyDays','lomo'];
    $scope.filterGallery = [];

    filters.forEach(function(f) {
        $scope.filterGallery.push('/filters/'+ f + '/gallery/' + $routeParams.id);
        console.log($scope.filterGallery);
    });

    

}]);
