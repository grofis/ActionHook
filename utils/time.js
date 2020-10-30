const moment = require('moment');

exports.getDate = function () {
	const time = moment(new Date()).format('YYYY-MM-DD_HH_mm');
	return time;
};
