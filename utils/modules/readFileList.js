/**
 *  读取所有md文件数据
 */
const fs = require('fs'); // 文件模块
const path = require('path');
const http = require('https');
// 路径模块
const docsRoot = path.join(__dirname, '..', '..', 'docs'); // docs文件路径

const readUtils = function () {
	this.readFile = function readFileList(dir = docsRoot, filesList = []) {
		const files = fs.readdirSync(dir);
		files.forEach((item, index) => {
			const filePath = path.join(dir, item);
			const stat = fs.statSync(filePath);
			if (stat.isDirectory() && item !== '.vuepress') {
				readFileList(path.join(dir, item), filesList); // 递归读取文件
			} else if (path.basename(dir) !== 'docs') { // 过滤docs目录级下的文件
				const fileNameArr = path.basename(filePath).split('.');
				let name = null;
				let type = null;
				if (fileNameArr.length === 2) { // 没有序号的文件
					name = fileNameArr[0];
					type = fileNameArr[1];
				} else if (fileNameArr.length === 3) { // 有序号的文件
					name = fileNameArr[1];
					type = fileNameArr[2];
				} else { // 超过两个‘.’的
					// console.log(chalk.yellow(`warning: 该文件"${filePath}"没有按照约定命名，将忽略生成相应数据。`))
					return;
				}
				if (type === 'md') { // 过滤非md文件
					filesList.push({
						name,
						filePath,
					});
				}
			}
			return filesList;
		});
	};

	this.loadPage = function loadPage(url) {
		const pm = new Promise((resolve, reject) => {
			http.get(url,
				(res) => {
					let html = '';
					res.on('data',
						(d) => {
							html += d.toString();
						});
					res.on('end',
						() => {
							resolve(html);
						});
				}).on('error',
				(e) => {
					reject(e);
				});
		});
		return pm;
	};
};

// module.exports = readUtils
exports = module.exports = new readUtils();
