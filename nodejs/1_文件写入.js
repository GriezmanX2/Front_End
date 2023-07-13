const fs = require('fs')

// 异步写入文件
fs.writeFile('./座右铭.txt', '己所不欲勿施于人', err => {
    if(err){
        console.log('写入失败')
        return
    }else{
        console.log('写入成功');
    }
})
// 同步写入文件
fs.writeFileSync('./data.txt', 'data')