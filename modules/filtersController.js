var fs = require('fs');
var path = require('path');


var rootDir = path.dirname(__dirname);


function mdFilter(request, response) {
   var src_path = rootDir + '/filters/' + request.filter + '/hd/' + request.id;
   var dst_path = rootDir + '/filters/'+ request.filter + '/md/' + request.id;

   fs.exists(rootDir + '/filters/' + request.filter +'/md', function(exists) {
      if (!exists) {
         makeDir(rootDir + '/filters/' + request.filter +'/md');
         resizeAndRender(src_path, dst_path, 1000, response);
      } else {
         resizeAndRender(src_path, dst_path, 1000, response);
      }
   });
}

function sdFilter(request, response) {
   var src_path = rootDir + '/filters/' + request.filter + '/hd/' + request.id;
   var dst_path = rootDir + '/filters/'+ request.filter + '/sd/' + request.id;

   fs.exists(rootDir + '/filters/' + request.filter +'/sd', function(exists) {
      if (!exists) {
         makeDir(rootDir + '/filters/' + request.filter +'/sd');
         resizeAndRender(src_path, dst_path, 200, response);
      } else {
         resizeAndRender(src_path, dst_path, 200, response);
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
            });
         }
   });
}

function makeDir(askPath) {
   fs.mkdir(askPath, function(err) {
      if (err) throw err;
   });
}

module.exports.mdFilter = mdFilter;
module.exports.sdFilter = sdFilter;
