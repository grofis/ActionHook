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

exports.post = function (data) {
	const opts = {
		token: 'd5dc6d732ffac0b7e1c5f309046deea06113a1dd',
		useragent: 'ActionHook',
		body: data,
		labels: ['dayly'],
	};
	createIssue('grofis/ActionHook', 'Great！.', opts, clbk);
};
