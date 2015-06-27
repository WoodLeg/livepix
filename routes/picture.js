var express = require('express');
var filter = require('../modules/filters');
var path = require('path');
var router = express.Router();
var path = require('path');


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
            var data = sortByFilter(data);

            response.send(data);
        });
    })

function sortByFilter(array){
   var ang = [];
   for (var i = 0 ; i < array.length; i++) {
      var img = {};
      img.hd = array[i];
      ang.push(img);
   }

   var md_array = mdPath(array);
   var sd_array = sdPath(array);

   for (var i = 0; i < ang.length; i++) {
      ang[i]['md'] = md_array[i];
      ang[i]['sd'] = sd_array[i];
   }

   return ang;
}


function mdPath(array) {
   var mdArray = [];
   for (var i = 0; i < array.length; i++) {
      var file = path.basename(array[i]);
      var base_type = path.dirname(path.dirname(array[i]));
      mdArray.push(base_type + '/md/' + file);
   }
   return mdArray;
}

function sdPath(array) {
   var sdArray = [];
   for (var i = 0; i < array.length; i++) {
      var file = path.basename(array[i]);
      var base_type = path.dirname(path.dirname(array[i]));
      sdArray.push(base_type + '/sd/' + file);
   }
   return sdArray;
}

module.exports = router;
