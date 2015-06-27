angular.module('livepixApp')

.controller('mainController',['$scope','mySocket','gallery', '$location', '$animate',
    function($scope, mySocket, gallery, $location, $animate){

      $animate.enabled('masonry', false);
      $scope.title = "Livepix";
      $scope.gallery = gallery.gallery;

      $scope.clickPic = function(id){
       $location.path('picture/' + id);
      }

      // Connection to the Socket Server
      mySocket.setHandler('open', function(){
         console.log('Demand for connection...');
      });


      // Event listener for message event, add a picture to the gallery display
      mySocket.setHandler('message', function(pack){
         var newPic = JSON.parse(pack.data);

         if (newPic.type === "add") {
             console.log('New picture added to $scope.gallery');
             $scope.gallery.push(newPic);
         }

         if (newPic.type === "unlink") {
             console.log('La photo ' + newPic.id + ' a été supprimée');
             $scope.gallery.splice($.inArray(newPic.gallery_path,$scope.gallery),1);
         }
      });

      mySocket.setHandler('close', function(msg) {
         console.log('Connection to server failed' || msg);
      });

}]);
