var express = require('express');
var filter = require('../modules/filters');
var path = require('path');
var router = express.Router();


var availFilters = filter.parser('filters/init');
var filtersPics = [];

router.param('id', function(request, response,next, id) {
   request.picName = id;
   next();
})

// Generate the filters' pictures and send an array with all the path to the client
.route('/filters/:id')
    .get(function(request, response) {
        filter.engage(availFilters, request.picName, function(data) {
            var dataParse = data.map(function(hd_path){
               var new_data = sdMapper(hd_path);
               return new_data;
            });
            response.send(dataParse);
        });
    })


function sdMapper(hd_path){
   var parent_path = path.dirname(hd_path);
   var file_name = path.basename(hd_path);
   parent_path = parent_path.split(path.sep);
   parent_path.pop();
   parent_path.push('sd');
   parent_path.push(file_name);
   var new_path = parent_path.join('/');
   return new_path;
}
module.exports = router;
