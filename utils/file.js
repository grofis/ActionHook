const fs = require('fs');
const path = require('path');
const time = require('./time');

const name = time.getDate()+'.md'


function writeData (data) {
  let name = time.getDate()+'.md'
  fs.writeFile(name, data,'utf8',function(error){
    if(error){
        console.log(error);
        return false;
    }
    //console.log('写入成功');
    //console.log('__dirname : ' + __dirname)
    //console.log(fs.path)
})
}

function logData (data) {
  let name = time.getDate()+'.log'
  fs.exists(name, function(exists) {
  if(!exists){
  	writeData('')
  }
  fs.appendFile(name, data,'utf8',function(error){
    if(error){
        console.log(error);
        return false;
    }
})

});
}
 
exports.writeData = writeData
exports.logData = logData

exports.appendData = function (data) {
  fs.exists(name, function(exists) {
  console.log(exists ? "创建成功" : "创建失败");
  if(!exists){
  	writeData('')
  }
  fs.appendFile(name, data,'utf8',function(error){
    if(error){
        console.log(error);
        return false;
    }
    //console.log('写入成功');
    //console.log('__dirname : ' + __dirname)
    //console.log(fs.path)
})
});
}