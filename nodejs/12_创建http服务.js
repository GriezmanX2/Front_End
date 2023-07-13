const http = require('http')
const url = require('url')
// 船舰服务对象
const server = http.createServer((request, response) => {
    // 获取请求方法
    console.log(request.method);
    // 获取请求的url（只包含路径和查询字符串）
    console.log(request.url);
    // 获取http协议版本号
    console.log(request.httpVersion);
    // 获取http请求头
    console.log(request.headers);
    // 通过url模块解析url
    let res = url.parse(request.url, true)
    // 路径
    let pathname = res.pathname
    // 查询字符串
    let query = res.query
    
    let body = ''
    request.on('data', chunk => {
        body += chunk
    })

    request.on('end', () => {
        console.log(body);

        response.setHeader('content-type','text/html;charset=utf-8')
        response.end('Hello HTTP Server')
    })

    
})
// 监听端口，启动服务
server.listen(9000, () => {
    console.log('服务已经启动');
})