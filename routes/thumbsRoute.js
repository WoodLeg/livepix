var express = require('express');
var router = express.Router();
var fs = require('fs');

var controller = require('../modules/galleryController');


router.param('id', function(request, response, next, id){
    request.id = id;
    next();
});

// Generate the thumbs if they don't exist and send the picture to the view
router.route('/thumbs/:id')
      .get(controller.picGallery);

router.route('/md/:id')
      .get(controller.picMD);

router.route('/sd/:id')
      .get(controller.picSD);


module.exports = router;
