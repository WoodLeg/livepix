var fs = require('fs');
var path = require('path');


var rootDir = path.dirname(__dirname);


function makeDir(askPath) {
   fs.mkdir(askPath, function(err) {
      if (err) throw err;
   });
}

function picGallery(request, response){
   var src_path = rootDir + '/gallery/' + request.id;
   var dst_path = rootDir + '/originals/thumbs/' + request.id;

   fs.exists(rootDir + '/originals/thumbs', function(exists) {
      if (!exists) {
         makeDir(rootDir + '/originals/thumbs');
         resize(src_path, dst_path, 250, response);
      }
      resize(src_path, dst_path, 250, response);
   });
}

function resize(_srcPath, _dstPath, _width, response){

   fs.exists(_dstPath, function(exists) {
         if (exists) {
            response.sendFile(_dstPath);
         } else {
            require('imagemagick').resize({
               srcPath: _srcPath,
               dstPath: _dstPath,
               width: _width,
            }, function(err){
               if (err) throw err;
               response.sendFile(_dstPath);
            })
         }

   })

}

module.exports.picGallery = picGallery;
