const fs = require('fs')
// 创建写入流对象
const ws = fs.createWriteStream('./观书有感.txt')
// 流式写入
ws.write('半某方塘一鉴开\r\n')
ws.write('天光云影共徘徊\r\n')
ws.write('问渠哪得清如许\r\n')
ws.write('唯有源头活水来\r\n')
// 关闭流对象
ws.close()