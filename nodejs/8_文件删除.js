const fs = require('fs')

fs.unlink('./观书有感.txt', err => {
    if(err){
        console.log('删除失败');
    }else{
        console.log('删除成功');
    }
})

fs.unlink('./签名.txt', err => {
    if(err){
        console.log('删除失败');
    }else{
        console.log('删除成功');
    }
})

