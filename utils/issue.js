const createIssue = require('github-create-issue');

let secrets = {};

try {
    secrets = require('../secret.js');
} catch (error) {
    console.log('no secret json, on github action')
}

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

	console.log('clientSecret:'+JSON.stringify(process.env.clientSecret))
    console.log('secrets:'+JSON.stringify(secrets.clientSecret))

    // console.log('secrets:'+JSON.stringify($clientSecret))


	const token = process.env.clientSecret ? process.env.clientSecret : secrets.clientSecret;
	const opts = {
		token: token,
		useragent: 'ActionHook',
		body: data,
		labels: [labelName],
	};
	// var opts = {
	//    	'token': '8e0c2e47751d85c6306775f3684ed1e34e6d01a1'
	// }
	createIssue('grofis/ActionHook', text, opts, clbk);
};
