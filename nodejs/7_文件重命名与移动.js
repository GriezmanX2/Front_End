const fs = require('fs')
// 也可以通过修改路径进行文件移动
fs.rename('./座右铭.txt', './签名.txt', err => {
    if(err){
        console.log('重命名失败');
    }else{
        console.log('重命名成功');
    }
})