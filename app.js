var sockjs = require('sockjs');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = sockjs.createServer({});
var chokidar = require('chokidar'); // Allow to watch a folder
var fs = require('fs');
var Caman = require('caman').Caman; // Filter module
var filter = require('./modules/filters');

// Routes handlers
var soloPicture = require('./routes/picture');
var filtersRoute = require('./routes/filtersRoute');
var thumbsRoute = require('./routes/thumbsRoute')

var watcher = chokidar.watch('gallery', {ignored: /[\/\\]\./, persistent: true});

// Middlewares
app.use(express.static(__dirname + '/public'));
app.use(function(request, response, next){
   request.rootDir = __dirname;
   next();
});

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
                client.write(JSON.stringify({type: event, gallery_path: '/originals/thumbs/' + _id, id: _id}));
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
                client.write(JSON.stringify({ type: 'add', gallery_path: 'originals/thumbs/' + filename, id: filename }));
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


app.use('/gallery', express.static(__dirname + '/gallery'));

/******** FILTERS PART *********/

// Parsing init folder for .filters
var filtersAvail = filter.parser('filters/init');
// Generate filters' folders
filter.makeDir(filtersAvail);

// Routes
app.use('/picture', soloPicture);
app.use('/filters', filtersRoute);
app.use('/originals', thumbsRoute);

var port = 8000;
server.listen(port, function(){
    console.log('Listening on port ' + port);
});
