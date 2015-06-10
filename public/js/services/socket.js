angular.module('livepixApp')


.factory('mySocket', function mySocketFactory(socketFactory) {
     
    mySocket = socketFactory({
        socket: new SockJS('http://localhost:8000/link')
    });

    return mySocket;
});
