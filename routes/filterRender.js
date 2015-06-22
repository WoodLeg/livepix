var express = require('express');
var router = express.Router();

router.param('id', function(request, response, next, id){
    request.id = id;
    next();
})

.param('filter', function(request, response, next, filter){
    request.filter = filter;
    next();
})


router.route('/:filter/:id')
    .get(function(request, response) {
        response.sendFile(request.originalUrl);
    });



module.exports = router;
