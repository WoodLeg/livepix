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
    
    fs.exists(dist_path, function(exists){
        if (exists) {
            response.sendFile(dist_path);
        } else {
            console.log('----- Création Thumb -----');
            require('imagemagick').crop({
                srcPath: src_path,
                dstPath: dist_path,
                width: 500,
                height:281
            }, function(err, stdout, stderr){
                if (!err){response.sendFile(dist_path);}
            });            
        }
    });
});


// SinCity Filer
app.get('/filters/sinCity/gallery/*', function(request, response) {
    var Caman = require('caman').Caman;
    var src_path = __dirname + '/gallery/' + request.params[0];
    var dst_path = __dirname + '/filters/sinCity/' + request.params[0];

    fs.exists(dst_path, function(exists) {
        if (exists) {
            response.sendFile(dst_path);
        } else {
            console.log('----- SinCity Filter Creation -----');
            Caman(src_path, function() {
                this.sinCity();
                this.render(function() {
                    this.save(dst_path);
                    setTimeout(function() {
                        console.log('SinCity Filter Done');
                        response.sendFile(dst_path);
                    }, 500);
                });

            });
        }
    });
});

// SunRise Filter
app.get('/filters/sunRise/gallery/*', function(request, response) {
    var Caman = require('caman').Caman;
    var src_path = __dirname + '/gallery/' + request.params[0];
    var dst_path = __dirname + '/filters/sunRise/' + request.params[0];


    fs.exists(dst_path, function(exists) {
        if (exists) {
            response.sendFile(dst_path);
        } else {
            console.log('----- SunRise Filter Creation -----');
            Caman(src_path, function() {
                this.sunrise();
                this.render(function() {
                    this.save(dst_path);
                    setTimeout(function() {
                        console.log('SunRise Filter Done');
                        response.sendFile(dst_path);
                    }, 500);
                });

            });
        }
    });
});


// Love Filter
app.get('/filters/love/gallery/*', function(request, response) {
    var Caman = require('caman').Caman;
    var src_path = __dirname + '/gallery/' + request.params[0];
    var dst_path = __dirname + '/filters/love/' + request.params[0];


    fs.exists(dst_path, function(exists) {
        if (exists) {
            response.sendFile(dst_path);
        } else {
            console.log('----- Love Filter Creation -----');
            Caman(src_path, function() {
                this.love();
                this.render(function() {
                    this.save(dst_path);
                    setTimeout(function() {
                        console.log('Love Filter Done');
                        response.sendFile(dst_path);
                    }, 500);
                });

            });
        }
    });
});


// Gungy Filter
app.get('/filters/grungy/gallery/*', function(request, response) {
    var Caman = require('caman').Caman;
    var src_path = __dirname + '/gallery/' + request.params[0];
    var dst_path = __dirname + '/filters/grungy/' + request.params[0];


    fs.exists(dst_path, function(exists) {
        if (exists) {
            response.sendFile(dst_path);
        } else {
            console.log('----- Grungy Filter Creation -----');
            Caman(src_path, function() {
                this.grungy();
                this.render(function() {
                    this.save(dst_path);
                    setTimeout(function() {
                        console.log('Gungy Filer Done');
                        response.sendFile(dst_path);
                    }, 500);
                });

            });
        }
    });
});


// HazyDays Filter
app.get('/filters/hazyDays/gallery/*', function(request, response) {
    var Caman = require('caman').Caman;
    var src_path = __dirname + '/gallery/' + request.params[0];
    var dst_path = __dirname + '/filters/hazyDays/' + request.params[0];


    fs.exists(dst_path, function(exists) {
        if (exists) {
            response.sendFile(dst_path);
        } else {
            console.log('----- HazyDays Filter Creation -----');
            Caman(src_path, function() {
                this.hazyDays();
                this.render(function() {
                    this.save(dst_path);
                    setTimeout(function() {
                        console.log('HazyDays Filter Done');
                        response.sendFile(dst_path);
                    }, 500);
                });

            });
        }
    });
});

app.get('/filters/lomo/gallery/*', function(request, response) {
    var Caman = require('caman').Caman;
    var src_path = __dirname + '/gallery/' + request.params[0];
    var dst_path = __dirname + '/filters/lomo/' + request.params[0];


    fs.exists(dst_path, function(exists) {
        if (exists) {
            response.sendFile(dst_path);
        } else {
            console.log('----- Lomo Filter Creation -----');
            Caman(src_path, function() {
                this.lomo();
                this.render(function() {
                    this.save(dst_path);
                    setTimeout(function() {
                        console.log('Lomo Filter Done');
                        response.sendFile(dst_path);
                    }, 500);
                });

            });
        }
    });
});


var port = 8000;
server.listen(port, function(){
    console.log('Listening on port ' + port);
});
