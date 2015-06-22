var fs = require('fs');
var Caman = require('caman').Caman;




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
                    if(err) {
                        throw err;
                    } else {
                        console.log(folder_name + ' folder created');
                    }
                })
            } else {
                console.log('Folder already exists');
            }
        });
    });
}

function actionFilter(array, name) {
    var src_path = __dirname + '/gallery/' + name;
    array.forEach(function(filter) {
        var dst_path = __dirname + '/filters/' + filter + '/' + name;
        console.log(dst_path);

        fs.exists(dst_path, function(exists) {
            if (exists) {
                console.log('Filter already rendered');
            } else {
                Caman(src_path, function() {
                    this[filter]();
                    this.render(function() {
                        this.save(dst_path);
                        console.log('Filter Rendered');
                    }
                }
            }
        });
    });
}

module.exports.parser = parser;
module.exports.makeDir = makeDir;
module.exports.engage = actionFilter;
