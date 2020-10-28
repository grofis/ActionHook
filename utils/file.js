const fs = require('fs');
const path = require('path');
 
exports.writeData = function (data) {
  let name = new Date().getTime()
  fs.writeFile(name+'.md', data,'utf8',function(error){
    if(error){
        console.log(error);
        return false;
    }
    console.log('写入成功');
    console.log('__dirname : ' + __dirname)
    console.log(fs.path)
})
}