angular.module('livepixApp')


.controller('picController', ['$scope','$routeParams', '$mdDialog','$http',
    function($scope, $routeParams, $mdDialog, $http) {
    
    $scope.originalSrc = '/gallery/'+ $routeParams.id;    
    $scope.filterGallery = [];

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


    var filters = ['lomo','orangePeel'];
    filters.forEach(function(f) {
        $http({method: 'GET', url: '/filters/' + f + '/gallery/' + $routeParams.id})
            .success(function(data, status) {
                var data = data.split('/');
                var data = data.slice(5);
                var imgName = data.pop();
                data.push('tmp');
                data.push(imgName);
                var parseData = data.join('/');
                
                console.log(parseData);
                $scope.filterGallery.push('/' + parseData);
            }).error(function(data, status){
                console.log(data + ' ' + status);
            });
    });
    

}]);
