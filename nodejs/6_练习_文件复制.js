const fs = require('fs')
const process = require('process')
// 方式一: readFile
// let data = fs.readFileSync('./[FK影视出品]笑傲江湖.1996.EP01.双语字幕.TVRip.X264.aa88.mkv')

// fs.writeFileSync('./copy.mkv', data)

// 方式二: 流式操作
const rs = fs.createReadStream('./[FK影视出品]笑傲江湖.1996.EP01.双语字幕.TVRip.X264.aa88.mkv')
const ws = fs.createWriteStream('./copy.mkv')

// rs.on('data', chunk => {
//     ws.write(chunk)
// })
rs.pipe(ws)
console.log(process.memoryUsage())