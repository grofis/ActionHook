const createIssue = require('github-create-issue');

function clbk(error, issue, info) {
	// Check for rate limit information...
	if (info) {
		console.error('Limit: %d', info.limit);
		console.error('Remaining: %d', info.remaining);
		console.error('Reset: %s', (new Date(info.reset * 1000)).toISOString());
	}
	console.log(`error:${JSON.stringify(error)}`);
	if (error) {
		throw new Error(error.message);
	}
	console.log(JSON.stringify(issue));
	// returns <issue_data>
}

exports.post = function (data, title, label) {
	const text = (title === undefined) ? 'test' : title;
	const labelName = (title === undefined) ? 'dayly' : label;
	const opts = {
		token: '8e0c2e47751d85c6306775f3684ed1e34e6d01a1',
		useragent: 'ActionHook',
		body: data,
		labels: [labelName],
	};
	// var opts = {
	//    	'token': '8e0c2e47751d85c6306775f3684ed1e34e6d01a1'
	// }
	createIssue('grofis/ActionHook', text, opts, clbk);
};
