var express = require('express');
var router = express.Router();
var fs = require('fs');

var controller = require('../module/galleryController');


router.param('id', function(request, response, next, id){
    request.id = id;
    next();
})

// Generate the thumbs if they don't exist and send the picture to the view
.route('/thumbs/:id')
      .get(controller.picGallery);


module.exports = router;
