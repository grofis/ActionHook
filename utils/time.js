const moment = require('moment');
 
exports.getDate = function(){
	let time = moment(new Date()).format('YYYY-MM-DD');
	return time;
}