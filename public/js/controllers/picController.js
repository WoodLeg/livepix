angular.module('livepixApp')


.controller('picController', ['$scope','$routeParams', '$mdDialog','$http', 'bigPicture', '$mdMedia','$location',
    function($scope, $routeParams, $mdDialog, $http, bigPicture, $mdMedia, $location) {

    console.log('---- PICTURE CONTROLLER ------');
    // Variable declarations
    $scope.originalSrc = '/gallery/'+ $routeParams.id;
    $scope.filterGallery = [];
    $scope.loading = true;
    bigPicture.change = "";
    $scope.filterHide = true;
    var alreadyOpened = false;


    // Handle the bigPicture Display
    $scope.$watch(function() {
        return bigPicture.change;
    }, function(newPic) {
        $scope.activePicture = newPic || $scope.originalSrc;
    });


    // Get all the paths for all filtered pictures generated
    $http({method: 'GET', url: '/picture/' + $routeParams.id})
        .success(function(data, status) {
            $scope.filterGallery = data;
        }).error(function(err, status) {
            console.log(err);
        });

/**
    $scope.askFiltered = function() {
        $http({methid: 'GET', url: '/picture/' + $routeParams.id})
            .success(function(data, status){
                console.log(data);
                console.log(status);
            }).error(function(data, status) {
                console.log(data);
                console.log(status);
            });
    }
    **/


    $scope.showFiltered = function() {
        if ($scope.filterHide) {
            $scope.filterHide = false;
        } else {
            $scope.filterHide = true;
        }


    }

    // Menu Stuff
    $scope.home = function() {
        $location.path('/');
    }

    $scope.bubble = {
        isOpen: false,
        direction: "down",
        mode: "md-scale",
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


}]);
