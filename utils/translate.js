const translate = require('google-translate-api');

function trans(txt, lang) {
	return new Promise((resolve, reject) => {
		translate(txt, { to: lang }).then((res) => {
			// console.log(res.text);
			//= > I speak English
			// console.log(res.from.language.iso);
			//= > nl
			resolve(res);
		}).catch((err) => {
			console.error(err);
			reject(err);
		});
	});
}

module.exports = {
	trans,
};
