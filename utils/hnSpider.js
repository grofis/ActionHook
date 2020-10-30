const axios = require('axios');
const timeago = require('timeago.js');
// const trans = require('./translate.js');
const file = require('./file.js');
const time = require('./time.js');
const issue = require('./issue.js');

function formateData(arr) {
  // console.log(top10Objs)
  const titles = [];
  arr.forEach((obj, i) => {
    const url = `https://news.ycombinator.com/item?id=${obj.objectID}`;
    obj.text = `**[${obj.title}](${url})**`;
    obj.created_at = `${timeago.format(obj.created_at, 'zh_CN')}`;
    // obj.num_comments = `[${num_comments} comments](https://news.ycombinator.com/item?id=${objectID})`
    titles.push(`${i}.  ` + `${obj.title}`);

    // trans.trans(`${title}`, 'zh-CN').then(function(d){
    // obj.text = `**[${d.text}](${url})**`
    // })

    // file.appendData(`${i + 1}. ${d.text} \r\n **[${title}](${url})**\r\n ${points} points by [${author}](https://news.ycombinator.com/user?id=${author}) ${timeago.format(created_at)} | [${num_comments} comments](https://news.ycombinator.com/item?id=${objectID}) \r\n`)
    if (i == arr.length - 1) {
      // 会有延迟 所以多等一下
      const contents = arr.map((des, j) =>{
      // console.log(j+" "+des.text+`\r\n`)
        return `${j + 1}. ${des.text} \r\n</br> ${des.title} \r\n</br> 好奇指数 ${des.points}点  由 ${des.author} ${des.created_at}发布 | 获得 ${des.num_comments}评论 \r\n</br>`
      }).join(''); 

issue.open({
    owner: 'grofis',
    repo: 'ActionHook',
    title: `Hacker News Daily Top 10 @${new Date().toISOString().slice(0, 10)}`,
    body: contents
  }).then((res)=>{
    const issueNumber = res.data.number;

  issue.lock({
    owner: 'grofis',
    repo: 'ActionHook', 
    issueNumber,
  });
  });

  


       file.writeData(contents);
       file.logData(`${time.getDate()}==>\r\n${titles.join('\r\n')}`);
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
