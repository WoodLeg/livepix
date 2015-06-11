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
    client.write(JSON.stringify({message: "Connection to Server established"}));

    // Boucle de surveillance du dossier
    var eventList = ['add','addDir','change','unlink','unlinkDir'];
    eventList.forEach(function(event){
        watcher.on(event, function(path){
            setTimeout(function(){
                console.log('Evenement: ' + event +', path ' + path);
                client.write(JSON.stringify({type: event, path: '/' + path }));
            },500);
        });
    });


    // Lecture de l'etat inital du dossier
    fs.readdir('gallery', function(err, files) {
        if(!err){
            var filesInit = files.filter(function(filename){
                return !(filename.match(/^\./));
            });
            filesInit.forEach(function(filename){
                client.write(JSON.stringify({ type: 'add', path: '/gallery/' + filename }));
            });
        }

    });


 // FIN DE LA CONNEXION -- AUCUNE RECEPTION DU CLIENT
    client.on('data', function(msg){ });
    client.on('close', function() {
        console.log('Closing connection with ' + client_ip + ' on '+ client_port); 
        console.log('--------------------------------------');
    });
});

// Initialisation de la route pour le server SockJS
io.installHandlers(server,{prefix: '/link'});

app.use(express.static(__dirname + '/public'));

app.use('/gallery', express.static(__dirname + '/gallery'));


// Génération des thumbsnail si n'existent pas
app.get('/thumbs/gallery/*', function(request, response) {
    var src_path = __dirname + '/gallery/'+ request.params[0]; 
    var dist_path = __dirname + '/thumbs/' + request.params[0];
    console.log(src_path);
    console.log(dist_path);
    
    fs.exists(dist_path, function(exists){
        if (exists) {
            response.sendFile(dist_path);
        } else {
            require('imagemagick').crop({
                srcPath: src_path,
                dstPath: dist_path,
                width: 200,
                height:120
            }, function(err, stdout, stderr){
                if (!err){response.sendFile(dist_path);}
            });
        }
    });
});



var port = 8000;
server.listen(port, function(){
    console.log('Listening on port ' + port);
});
