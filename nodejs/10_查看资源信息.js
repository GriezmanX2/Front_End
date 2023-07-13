const fs = require('fs')

fs.stat('./copy.mkv', (err, data) => {
    if (err) {
        console.log('查看信息失败');
    } else {
        console.log('查看信息成功', data);
        console.log(data.isFile());
        console.log(data.isDirectory());
    }
})