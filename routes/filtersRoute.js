var express = require('express');
var router = express.Router();

var controller = require('../modules/filtersController')

router.param('id', function(request, response, next, id){
    request.id = id;
    next();
})

.param('filter', function(request, response, next, filter){
    request.filter = filter;
    next();
})


router.route('/:filter/sd/:id')
      .get(controller.sdFilter);

// Send the file to the view
router.route('/:filter/md/:id')
      .get(controller.mdFilter);





module.exports = router;
