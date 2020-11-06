const moment = require('moment');

exports.getFileDate = function () {
	const time = moment(new Date()).format('YYYY-MM-DD_HH_mm');
	return time;
};

exports.getTitleHour = function () {
	const time = moment(new Date()).format('YYYY-MM-DD HH:mm');
	return time;
};
