
const trans = require('./translate.js')
const file = require('./file.js')
const time = require('./time.js')
const axios = require('axios')
const timeago = require('timeago.js');

main()

/**
 * 主体函数
 */
function main () {
	file.writeData('contents')
    file.logData('time')
	
  let endTime = Math.round(new Date().getTime() / 1000) - (12 * 60 * 60)
  // 1 hour before start of the date (save missed posts)
  let startTime = Math.round(new Date().getTime() / 1000) - (24 * 60 * 60)
  let url = `https://hn.algolia.com/api/v1/search?numericFilters=created_at_i>${startTime},created_at_i<${endTime}`
  console.log(url)
  
  let res = axios.get(url).then(function (res) {   
    let top10Objs = res.data.hits.slice(0, 10)
    formateData(top10Objs)  
    //  file.writeData(contents)
  }).catch(function (error) {
    console.log(error)
  })
  
  
}



function formateData(arr){
  // console.log(top10Objs)
  	let titles = []
    arr.map((obj, i) => {
        let { title, created_at, url, author, points, objectID, num_comments } = obj
        if (!url) url = `https://news.ycombinator.com/item?id=${objectID}`

        // trans.trans(`${title}`, 'zh-CN').then(function(d){
        // obj.text = `**[${d.text}](${url})**` 
        // })   

           obj.text = `**[${title}](${url})**` 
           obj.title = `${title}`
           obj.author = `[${author}](https://news.ycombinator.com/user?id=${author})`
           obj.created_at = `${timeago.format(created_at, 'zh_CN')}`
           // obj.num_comments = `[${num_comments} comments](https://news.ycombinator.com/item?id=${objectID})`
           titles.push(i+'.	'+`${title}`)


           // file.appendData(`${i + 1}. ${d.text} \r\n **[${title}](${url})**\r\n ${points} points by [${author}](https://news.ycombinator.com/user?id=${author}) ${timeago.format(created_at)} | [${num_comments} comments](https://news.ycombinator.com/item?id=${objectID}) \r\n`)
           if(i==arr.length-1){
             // 会有延迟 所以多等一下
             let contents= arr.map((des, j) => {
                // console.log(j+" "+des.text+`\r\n`)
                return (`${j + 1}. ${des.text} \r\n ${des.title} \r\n 好奇指数 ${des.points}点  由 ${des.author} ${des.created_at}发布 | 获得 ${des.num_comments}评论 \r\n`)
              }).join('')
             file.writeData(contents)
             file.logData(time.getDate()+'==>\r\n'+titles.join('\r\n'))
             
           }  
      })
}
