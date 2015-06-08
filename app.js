var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');


app.use(express.static('public/'));

var urlencodedParser = bodyParser.urlencoded({ extended: false});


app.get('/gallery', function(request, response) {
   
    console.log('New Request');
    fs.readdir('public/img/', function(err, data){
        if (err) throw response.send(err);
        //console.log(JSON.stringify(data));
        response.json(data);
    });
   
});


app.listen(3000, function() {
    console.log('Listening on port 3000');
});
