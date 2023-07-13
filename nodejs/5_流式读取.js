const fs = require('fs')
// 创建读取流对象
const rs = fs.createReadStream('./[FK影视出品]笑傲江湖.1996.EP01.双语字幕.TVRip.X264.aa88.mkv')
// 绑定data事件 每个chunk包含64kb的数据
rs.on('data', chunk => {
    console.log(chunk);
    console.log(chunk.length)
})
// 绑定end事件（可选）
rs.on('end', () => {
    console.log('读取完成');
})