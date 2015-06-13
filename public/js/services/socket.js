angular.module('livepixApp')


.factory('mySocket', function mySocketFactory(socketFactory) {

    var address = "192.168.1.27";

    mySocket = socketFactory({
        socket: new SockJS('http://'+address +':8000/link')
    });

    return mySocket;
});
