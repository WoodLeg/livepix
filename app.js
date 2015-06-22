var sockjs = require('sockjs');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = sockjs.createServer({});
var chokidar = require('chokidar'); // Allow to watch a folder
var fs = require('fs');
var Caman = require('caman').Caman; // Filter module
var filter = require('./filters');
var path = require('path');

// Routes

var soloPicture = require('./routes/picture.js');
var filterRender = require('./routes/filterRender.js');


var watcher = chokidar.watch('gallery', {ignored: /[\/\\]\./, persistent: true});

// Connection of the client
io.on('connection', function(client) {

    console.log(client.readyState);
    var client_ip = client.address.address;
    var client_port = client.address.port;
    console.log('New connection from: '+ client_ip + ' on ' + client_port);
    client.write(JSON.stringify({message: "Connection to Server established"}));

    // Watch the folder /gallery for differents events
    var eventList = ['add','addDir','change','unlink','unlinkDir'];
    eventList.forEach(function(event){
        watcher.on(event, function(path){
            setTimeout(function(){
                var _id = path.split('/');
                _id = _id.pop();
                console.log('Evenement: ' + event +', path ' + path);
                client.write(JSON.stringify({type: event, gallery_path: '/' + path, id: _id}));
            },500);
        });
    });


    // Read the inital state of the folder at the connection
    fs.readdir('gallery', function(err, files) {
        if(!err){
            var filesInit = files.filter(function(filename){
                return !(filename.match(/^\./));
            });
            filesInit.forEach(function(filename){
                client.write(JSON.stringify({ type: 'add', gallery_path: '/gallery/' + filename, id: filename }));
            });
        }

    });


 // End the connect - No data from the client
    client.on('data', function(msg){});
    client.on('close', function() {
        console.log('Closing connection with ' + client_ip + ' on '+ client_port);
        console.log('--------------------------------------');
    });
});

// Configure the route for the socket server
io.installHandlers(server,
    {
        prefix: '/link',
        log: function(severity, message) {
            console.log('Severity: ' + severity);
            console.log('Message Socket Log: ' + message);
        }
    }
);

app.use(express.static(__dirname + '/public'));

app.use('/gallery', express.static(__dirname + '/gallery'));

// Generate the thumbs if they don't exist and send the picture the view
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


/******** FILTERS PART *********/

// Parsing init folder for .filters
var filtersAvail = filter.parser('filters/init');
// Generate filters' folders
filter.makeDir(filtersAvail);

// Routes



app.use('/picture', soloPicture);
app.use(__dirname + '/filters', filterRender);


var port = 8000;
server.listen(port, function(){
    console.log('Listening on port ' + port);
});
