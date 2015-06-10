var sockjs = require('sockjs');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = sockjs.createServer({});
var chokidar = require('chokidar');
var fs = require('fs');

var watcher = chokidar.watch('gallery', {ignored: /[\/\\]\./, persistent: true});



io.on('connection', function(client) {
    var client_ip = client.address.address;
    var client_port = client.address.port;
    console.log('New connection from: '+ client_ip + ' on ' + client_port);
    client.write('Server: Connection established...');

    
    client.on('data', function(msg){
        console.log('Receiving data from: ' + client_ip );
        console.log(msg);
    });

    client.on('close', function() {
        console.log('Closing connection with ' + client_ip + ' on '+ client_port); 
    });
});


io.installHandlers(server,{prefix: '/link'});

app.use(express.static(__dirname + '/public'));


var port = 8000;
server.listen(port, function(){
    console.log('Listening on port ' + port);
});
