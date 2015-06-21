var fs = require('fs');



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


module.exports.parser = parser;
module.exports.makeDir = makeDir;
