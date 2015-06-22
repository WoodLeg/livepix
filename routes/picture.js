var express = require('express');
var filter = require('../filters');
var router = express.Router();


var availFilters = filter.parser('filters/init');

router.param('id', function(request, response,next, id) {
   request.picName = id; 
   next();
})

.route('/:id')
    .get(function(request, response) {
        var filtersPics = filter.engage(availFilters, request.picName);
        response.json(filtersPics);
    });

module.exports = router;
