module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'airbnb-base',
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
	rules: {
		'prefer-destructuring': ['error', { object: true, array: false }],
		indent: ['error', 'tab'],
	},
};
