var express = require('express');
var filter = require('../filters');
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
            response.send(data);
        });
    })



module.exports = router;
