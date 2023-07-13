const fs = require('fs')
// 异步追加写入
fs.appendFile('./座右铭.txt', ' 起飞', err => {
    if(err){
        console.log('出错啦');
    }else{
        console.log('成功啦')
    }
})
// 同步追加写入
fs.appendFileSync('./data.txt', ' test')