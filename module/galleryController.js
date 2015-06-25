var fs = require('fs');
var path = require('path');


var rootDir = path.dirname(__dirname);


function picGallery(request, response){
   var src_path = rootDir + '/gallery/' + request.id;
   var dst_path = rootDir + '/originals/thumbs/' + request.id;

   fs.exists(rootDir + '/originals/thumbs', function(exists) {
      if (!exists) {
         makeDir(rootDir + '/originals/thumbs');
         resizeAndRender(src_path, dst_path, 250, response);
      } else {
         resizeAndRender(src_path, dst_path, 250, response);
      }
   });
}

function picMD(request, response){
   var src_path = rootDir + '/gallery/' + request.id;
   var dst_path = rootDir + '/originals/md/' + request.id;

   fs.exists(rootDir + '/originals/md', function(exists){
      if (!exists) {
         makeDir(rootDir + '/originals/md');
         resizeAndRender(src_path, dst_path, 400, response);
      } else {
         resizeAndRender(src_path, dst_path, 400, response)
      }
   });
}

function picSD(request, response){
   var src_path = rootDir + '/gallery/' + request.id;
   var dst_path = rootDir + '/originals/sd/' + request.id;

   fs.exists(rootDir + '/originals/sd', function(exists){
      if (!exists) {
         makeDir(rootDir + '/originals/sd');
         resizeAndRender(src_path, dst_path, 400, response);
      } else {
         resizeAndRender(src_path, dst_path, 400, response)
      }
   });
}

function resizeAndRender(_srcPath, _dstPath, _width, response){
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
   });
}

function makeDir(askPath) {
   fs.mkdir(askPath, function(err) {
      if (err) throw err;
   });
}

module.exports.picGallery = picGallery;
module.exports.picMD = picMD;
module.exports.picSD = picSD;
