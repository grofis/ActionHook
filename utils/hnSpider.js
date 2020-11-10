const axios = require('axios');
const timeago = require('timeago.js');
// const trans = require('./translate.js');
const encoding = require('encoding');
const github = require('octonode');
const file = require('./file.js');
const time = require('./time.js');
const issue = require('./issue.js');


function formateData(arr) {
	// console.log(top10Objs)
	const titles = [];
	arr.forEach((obj, i) => {
		const commnetsUrl = `https://news.ycombinator.com/item?id=${obj.objectID}`;
		if (obj.url == null) {
			obj.url = commnetsUrl;
		}
		obj.text = `**[${obj.title}](${obj.url})**`;
		obj.created_at = `${timeago.format(obj.created_at, 'en')}`; // zh_CN
		obj.author = `[${obj.author}](${commnetsUrl})`;
	    // obj.num_comments = `[${obj.num_comments}](https://news.ycombinator.com/item?id=${obj.objectID})`
		titles.push(`${i + 1}.  ` + `${obj.title}`);

		// trans.trans(`${title}`, 'zh-CN').then(function(d){
		// obj.text = `**[${d.text}](${url})**`
		// })

		// file.appendData(`${i + 1}. ${d.text} \r\n **[${title}](${url})**\r\n ${points} points by [${author}](https://news.ycombinator.com/user?id=${author}) ${timeago.format(created_at)} | [${num_comments} comments](https://news.ycombinator.com/item?id=${objectID}) \r\n`)
		if (i == arr.length - 1) {
			// 会有延迟 所以多等一下
			const contents = arr.map((des, j) => {
			// console.log(j+" "+des.text+`\r\n`)
				console.log(`${j + 1}. ${des.text} \r\n  ${des.title} \r\n ${des.points}奇 | ${des.author}作 ${des.created_at}前 | ${des.num_comments}评\r\n`);
				return `${j + 1}. ${des.text} \r\n  ${des.title} \r\n ${des.points}points  by ${des.author} ${des.created_at} |  ${des.num_comments} comments\r\n`;
			}).join('');

			/*
			issue.open({
				owner: 'grofis',
				repo: 'ActionHook',
				title: `Hacker News Daily Top 10 @${new Date().toISOString().slice(0, 10)}`,
				body: contents,
			}).then((res) => {
				const issueNumber = res.data.number;

				issue.lock({
					owner: 'grofis',
					repo: 'ActionHook',
					issueNumber,
				});
			});
      */
      		const title = `Hacker News ${time.getTitleHour()}`;
      		const contentTxt = `${contents} \n${titles.join('\r\n')}`
      		console.log('\r\ntype is:'+typeof(contentTxt))
      		console.log('\r\ntest is:'+contentTxt.toString())

		    issue.post(contentTxt.toString(), title, 'Hacker');
			// console.log('contentTxt:'+contentTxt)

			// log打印内容
			// file.writeData(contents);
			// file.logData(`${contents} \n${titles.join('\r\n')}`);


			// file.appendData(`${time.getDate()}==>\r\n${titles.join('\r\n')}`);
			// file.logData(`${time.getDate()}==>\r\n${titles.join('\r\n')}`);
			// file.logData(JSON.stringify(arr));
		}
	});
}

/**
 * 主体函数
 */
function main() {
	// file.writeData('contents')
	// file.logData('time')

	const endTime = Math.round(new Date().getTime() / 1000) - (12 * 60 * 60);
	// 1 hour before start of the date (save missed posts)
	const startTime = Math.round(new Date().getTime() / 1000) - (24 * 60 * 60);
	const url = `https://hn.algolia.com/api/v1/search?numericFilters=created_at_i>${startTime},created_at_i<${endTime}`;
	console.log(url);

	axios.get(url).then((res) => {
		const top10Objs = res.data.hits.slice(0, 10);
		formateData(top10Objs);
	}).catch((error) => {
		console.log(error);
	});
}

main();

function test() {
	const client = github.client('d5dc6d732ffac0b7e1c5f309046deea06113a1dd');

	client.get('/user', {}, (err, status, body, headers) => {
		console.log(body); // json object
	});

	const ghrepo = client.repo('grofis/ActionHook');

	ghrepo.issue({
		title: 'Found a bug',
		body: "I'm having a problem with this.",
		assignee: 'octocat',
		milestone: 1,
		labels: ['Label1', 'Label2'],
	}, (err, status, body, headers) => {
		console.log(body); // json object
	}); // issue
}

// test();
