var fs = require('fs');
var Caman = require('caman').Caman;
var async = require('async');


// Parse given path for .filters and return an array of filters
function parser(dirPath) {
    var filterArrayInit = fs.readdirSync(dirPath);
    var filterArrayParsed = [];
    filterArrayInit.forEach(function(filter){
        filter = filter.split('.');
        filter.pop();
        filterArrayParsed.push(filter.pop());
    });
    return filterArrayParsed;
}

// Generate filters' folders reguarding the filters'array given
function makeDir(array) {
    array.forEach(function(folder_name) {
        fs.exists(__dirname + '/filters/' + folder_name, function(exists) {
            if (!exists) {
                fs.mkdir(__dirname + '/filters/' + folder_name, function(err) {
                    console.log('----' + folder_name + ' folder created -----');
                    if (err) {
                        throw err;
                    } else {
                        fs.exists(__dirname + '/filters/' + folder_name + '/sd', function(err) {
                           if (exists) {console.log('SD forlder already exists.')}
                           fs.mkdir(__dirname + '/filters/' + folder_name + '/sd', function(err) {
                              if (err) throw err;
                              console.log('SD folder created');
                           });
                        });
                        fs.exists(__dirname + '/filters/' + folder_name + '/md', function(err) {
                           if (exists) {console.log('MD forlder already exists.')}
                           fs.mkdir(__dirname + '/filters/' + folder_name + '/md', function(err) {
                              if (err) throw err;
                              console.log('MD folder created');
                           });
                        });
                        fs.exists(__dirname + '/filters/' + folder_name + '/hd', function(err) {
                           if (exists) {console.log('HD forlder already exists.')}
                           fs.mkdir(__dirname + '/filters/' + folder_name + '/hd', function(err) {
                              if (err) throw err;
                              console.log('HD folder created');
                           });
                        });
                    }
                })
            } else {
                console.log('Folder ' + folder_name + ' already exists');
            }
        });
    });
}

// Generate the filters' pictures if they don't exist
function engage(filters, name, getFilters) {
    var src_path = __dirname + '/gallery/' + name;
    var generated = [];

    async.each(filters, function(filter, callback){
        var dst_path = __dirname + '/filters/' + filter + '/' + name;
        fs.exists(dst_path, function(exists) {
            if (exists) {
                generated.push(dst_path);
                console.log('Filter already rendered');
                callback();
            } else {
                Caman(src_path, function() {
                    this[filter]();
                    this.render(function() {
                        this.save(dst_path);
                        generated.push(dst_path);
                        callback();
                        console.log('Filter ' + filter +' Rendered');
                    });
                });
            }
        });
    }, function(err){
        if (err) {
          console.log(err);
        } else {
          return getFilters(generated)
        };
      }
    );
}

module.exports.parser = parser;
module.exports.makeDir = makeDir;
module.exports.engage = engage;
