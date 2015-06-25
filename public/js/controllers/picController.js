angular.module('livepixApp')


.controller('picController', ['$scope','$routeParams', '$mdDialog','$http', 'bigPicture', '$mdMedia','$location',
    function($scope, $routeParams, $mdDialog, $http, bigPicture, $mdMedia, $location) {

    console.log('---- PICTURE CONTROLLER ------');
    // Variable declarations
    $scope.originalSrc = '/gallery/'+ $routeParams.id;
    $scope.sd_originalSrc = '/originals/sd/' + $routeParams.id;
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

    $scope.askFiltersPic = function(){
      $scope.loading = true;
      if (!alreadyOpened) {
         alreadyOpened = true;
         $http({method: 'GET', url: '/picture/filters/' + $routeParams.id})
             .success(function(data, status) {
                 $scope.filterGallery = data;
                 $scope.filterGallery.push($scope.sd_originalSrc);
             }).error(function(err, status) {
                 console.log(err);
             }).finally(function(){
                $scope.loading = false;
             });
      }
    }

    // Display the filters on the page or not when "show filters" is clicked
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

    // Launch the impression of the bigPicture
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
            controller: function ($scope, $mdDialog, $routeParams){
                $scope.picName = $routeParams.id;
                $scope.closeDialog = function() {
                    $mdDialog.hide();
                }
            }
        });

    };

    // Send a mail with the bigPicture
    $scope.mailIt = function($event) {
        var par = angular.element(document.body);
        $mdDialog.show({
            parent: par,
            targetEvent: $event,
            templateUrl: 'partials/templates/mailDialogForm.html',
            controller: function ($scope, $mdDialog, $routeParams){
                $scope.picName = $routeParams.id;
                $scope.closeDialog = function() {
                    $mdDialog.hide();
                }
                $scope.send = function(mail) {
                    alert("Photo envoyé à " + mail);
                    $mdDialog.hide();
                }
            }
        });

    };
}]);
