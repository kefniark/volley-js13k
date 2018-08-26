var zipdir = require('zip-dir');
var fs = require("fs");

zipdir('./dist', { saveTo: './project.zip' }, function (err, buffer) {
    if (err) {
        throw new Error(err);
    }

    var stats = fs.statSync('./project.zip');
    
	console.log("Zip generated !", stats["size"], "Bytes (", Math.round(stats["size"] / 13000 * 100), "%)" );
	
	zipdir('./dist/assets', { saveTo: './assets.zip' }, function (err, buffer) {
		if (err) {
			throw new Error(err);
		}
	
		var stats = fs.statSync('./assets.zip');
		
		console.log("Asset Folder", stats["size"], "Bytes (", Math.round(stats["size"] / 13000 * 100), "%)" );
		fs.unlinkSync('./assets.zip');
	});
});
