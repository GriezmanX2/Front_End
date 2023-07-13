const fs = require('fs')
// 异步读取
fs.readFile('./观书有感.txt', (err, data) => {
    if(err){
        console.log('读取失败');
    }else{
        console.log('异步读取结果\r\n', data.toString());
    }
})
// 同步读取
let data = fs.readFileSync('./观书有感.txt')
console.log('同步读取结果\r\n', data.toString())