var zipdir = require('zip-dir');
var fs = require("fs");

zipdir('./dist', { saveTo: './project.zip' }, function (err, buffer) {
    if (err) {
        throw new Error(err);
    }

    var stats = fs.statSync('./project.zip');
    
    console.log("Zip generated !", stats["size"], "Bytes (", Math.round(stats["size"] / 13000 * 100), "%)" );
});