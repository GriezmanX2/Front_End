/*
  index.js: webpack入口文件
  1.运行指令：
   开发环境： webpack ./src/index.js -o ./build/built.js --mode=development
   webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.j
   生产环境： webpack ./src/index.js -o ./build/built.js --mode=production
   webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js

  2.结论：
    - webpack能偶处理js,json资源，不能处理其他类型资源。
    - 生产环境和开发环境将ES6模块化编译成浏览器能识别的模块化
    - 生产环境比开发环境多一个压缩js代码处理。
*/

import data from './data.json'
import './index.css'
import './index.less'
import './iconfont.css'

console.log('data', data)

function add(x, y){
  return x + y;
}

console.log(add(4, 5))