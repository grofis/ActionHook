/**
 * 生成百度链接推送文件
 */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const cheerio = require('cheerio');
const readUtils = require('./modules/readFileList');

const urlsRoot = path.join(__dirname, '..', 'urls.txt'); // 百度链接推送文件
const DOMAIN = process.argv.splice(2)[0]; // 获取命令行传入的参数

/**
 * 主体函数
 */
function main() {
	if (!DOMAIN) {
		console.log(chalk.red('请在运行此文件时指定一个你要进行百度推送的域名参数，例：node utils/baiduPush.js https://www.grofis.com'));
		return;
	}

	readUtils.loadPage('https://grofis.com/archives/').then((d) => {
		// 从html中解析出信息
		const $ = cheerio.load(d);
		const titleList = $('.post-title .post-title-link');
		let urls = '';
		titleList.each(function () {
			const title = $(this);
			const link = `${DOMAIN}${title.attr('href')}\r\n`;
			// console.log(link)
			urls += link;
		});
		console.log(urls);
		fs.writeFileSync(urlsRoot, urls);
	});
}

main();
