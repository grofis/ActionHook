const file = require('./file');

function logFiles(){
	file.traverseDir('/Users/Mac/git/grofis_images/2020-11/', function(name, stat){
		console.log(name)
	})	
}

logFiles()