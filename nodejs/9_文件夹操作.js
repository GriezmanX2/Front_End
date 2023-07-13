const fs = require('fs')

// fs.mkdir('./html', err => {
//     if (err) {
//         console.log('创建文件夹失败');
//     } else {
//         console.log('创建文件夹成功');
//     }
// })

// 递归创建
// fs.mkdir('./outer/inner', {
//     recursive: true
// }, err => {
//     if (err) {
//         console.log('递归创建文件夹失败');
//     } else {
//         console.log('递归创建文件夹成功');
//     }
// })

// 读取文件夹
// fs.readdir('../nodejs', (err, data) => {
//     if (err) {
//         console.log('读取文件夹失败');
//     } else {
//         console.log('读取文件夹成功', data);
//     }
// })

// 删除文件夹
// fs.rmdir('./html', err => {
//     if (err) {
//         console.log('删除文件夹失败');
//     } else {
//         console.log('删除文件夹成功');
//     }
// })

// 递归删除文件夹
fs.rmdir('./outer', {
    recursive: true
}, err => {
    if (err) {
        console.log('递归删除文件夹失败');
    } else {
        console.log('递归删除文件夹成功');
    }
})