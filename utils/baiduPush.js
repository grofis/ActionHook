/**
 * 生成百度链接推送文件
 */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const matter = require('gray-matter') // FrontMatter解析器 https://github.com/jonschlinkert/gray-matter
const readUtils = require('./modules/readFileList')
const trans = require('./translate.js')
const file = require('./file.js')
const urlsRoot = path.join(__dirname, '..', 'urls.txt') // 百度链接推送文件
const DOMAIN = process.argv.splice(2)[0] // 获取命令行传入的参数
const timeago = require('timeago.js');

const axios = require('axios')

if (!DOMAIN) {
  console.log(chalk.red('请在运行此文件时指定一个你要进行百度推送的域名参数，例：node utils/baiduPush.js https://www.grofis.com'))
  return
}

main()

/**
 * 主体函数
 */
function main () {
  let cheerio = require('cheerio')
  readUtils.loadPage('https://grofis.com/archives/').then(function (d) {
    let $ = cheerio.load(d)
    let titleList = $('.post-title .post-title-link')
    titleList.each(function (item) {
      let title = $(this)
      const link = `\r\n${DOMAIN}${title.attr('href')}`
      // console.log(link)
      fs.appendFileSync(urlsRoot, link)
    })
  })

  let endTime = Math.round(new Date().getTime() / 1000)
  // 1 hour before start of the date (save missed posts)
  let startTime = Math.round(new Date().getTime() / 1000) - (22 * 60 * 60)
  let url = `https://hn.algolia.com/api/v1/search?numericFilters=created_at_i>${startTime},created_at_i<${endTime}`
  console.log(url)
  let res = axios.get(url).then(function (res) {
    
    let top10Objs = res.data.hits.slice(0, 10)
    
    // console.log(top10Objs)
    let contents = top10Objs.map((obj, i) => {
        let { title, created_at, url, author, points, objectID, num_comments } = obj
        if (!url) url = `https://news.ycombinator.com/item?id=${objectID}`

        trans.trans(`${title}`, 'zh-CN').then(function(d){
          console.log('title:'+ obj.title)
          console.log('trans:'+d.text)
          return `${i + 1}. ${d.text} \r\n **[${title}](${url})**\r\n ${points} points by [${author}](https://news.ycombinator.com/user?id=${author}) ${timeago.format(created_at)} | [${num_comments} comments](https://news.ycombinator.com/item?id=${objectID}) \r\n`
      
        })
        
      }).join('')
      // console.log(contents)
      file.writeData(contents)
  }).catch(function (error) {
    console.log(error)
  })


}
