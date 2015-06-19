angular.module('livepixApp')


.controller('picController', ['$scope','$routeParams', '$mdDialog','$http', 'bigPicture', '$mdMedia',
    function($scope, $routeParams, $mdDialog, $http, bigPicture, $mdMedia) {
    
    // Variable declarations
    $scope.originalSrc = '/gallery/'+ $routeParams.id;    
    $scope.filterGallery = [];
    bigPicture.change = "";
    $scope.filterHide = true;
    var alreadyOpened = false;  
    $scope.bubble = {
        isOpen: false,
        direction: "down",
        mode: "md-scale",
    }

   
    // Menu direction for mobile
    $scope.$watch(function() {
        return $mdMedia('sm');
    }, function(small) {
        if (small) {
            $scope.bubble.direction = "right";
        } else {
            $scope.bubble.direction = "down";
        }
    })
    
    
    // Handle the bigPicture Display
    $scope.$watch(function() {
        return bigPicture.change;
    }, function(newPic) {
        $scope.activePicture = newPic || $scope.originalSrc;
    });
    

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
        $http({method: 'GET', url: '/filters/' + filter + '/gallery/' + id})
            .success(function(data, status) {
                //Url management
                var parseData = urlHandler(data);
                $scope.filterGallery.push('/' + parseData);
            }).error(function(data, status) {
                console.log(data + ' ' + status);
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
