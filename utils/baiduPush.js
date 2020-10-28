/**
 * 生成百度链接推送文件
 */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const matter = require('gray-matter') // FrontMatter解析器 https://github.com/jonschlinkert/gray-matter
const readUtils = require('./modules/readFileList')

const urlsRoot = path.join(__dirname, '..', 'urls.txt') // 百度链接推送文件
const DOMAIN = process.argv.splice(2)[0] // 获取命令行传入的参数




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
}

