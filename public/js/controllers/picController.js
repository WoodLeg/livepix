angular.module('livepixApp')


.controller('picController', ['$scope','$routeParams', '$mdDialog','$http', 'bigPicture', '$mdMedia','$location',
    function($scope, $routeParams, $mdDialog, $http, bigPicture, $mdMedia, $location) {
    
    // Variable declarations
    $scope.originalSrc = '/gallery/'+ $routeParams.id;    
    $scope.filterGallery = [];
    $scope.loading = true;
    bigPicture.change = "";
    $scope.filterHide = true;
    var alreadyOpened = false;  
    
    $scope.bubble = {
        isOpen: false,
        direction: "down",
        mode: "md-scale",
    }

    
    // Handle the bigPicture Display
    $scope.$watch(function() {
        return bigPicture.change;
    }, function(newPic) {
        $scope.activePicture = newPic || $scope.originalSrc;
    });
    
    $scope.home = function() {
        $location.path('/');
    }

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


    /********** FILTERS MANAGEMENT **********/
    $scope.showFiltered = function() {
        if ($scope.filterHide === false ) {
            $scope.filterHide = true;
            alreadyOpened = true;
        } else {
            $scope.filterHide = false; 
            if (alreadyOpened == false) {
                var filters = ['lomo','orangePeel','vintage'];
                generateFilter(filters);
            }
        }
    }


    function generateFilter(filters) {
        angular.forEach(filters, function(f) {
            delayRequest(f, $routeParams.id);
        });
    }

    function delayRequest(filter, id) {
        $scope.loading = true;
        $http({method: 'GET', url: '/filters/' + filter + '/gallery/' + id})
            .success(function(data, status) {
                //Url management
                var parseData = urlHandler(data);
                $scope.filterGallery.push('/' + parseData);
                $scope.loading = false;
            }).error(function(data, status) {
                console.log(data + ' ' + status);
            }).finally(function() {
            });
        console.log('Envoie request pour ' + filter);
    }

    function urlHandler(data){
        var data = data.split('/');
        var data = data.slice(5);
        var imgName = data.pop();
        data.push('render');
        data.push(imgName);
        var parseData = data.join('/');
        return parseData;
    }
}]);
