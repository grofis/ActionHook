const fs = require('fs');
const path = require('path');
const time = require('./time');

const name = './docs/'+time.getDate()+'.md'


function writeData (data) {
  console.log("data==>"+data)
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
  let name = './logs/'+time.getDate()+'.log'
  fs.exists(name, function(exists) {
  if(!exists){
  	fs.writeFile(name, data,'utf8',function(error){})
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
  	fs.writeFile(name, data,'utf8',function(error){})
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