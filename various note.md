## 前端文件操作与文件上传
### 前端上传文件方法
1. 二进制blob传输(formData)
2. base64传输(转为base64传输)

### 相关对象
1. files: 通过input标签获取的文件对象。
2. blob: 不可变的二进制内容，包含很多文件操作方法。
3. formData: 用于向后端传输的对象（blob后端无法识别，不能用于后端传输）。
4. fileReader: 多用于把文件读取为某种形式，如base64、text文本。

# vanilla
## this指向
- 箭头函数：只想其外层作用域的this,因为箭头函数没有自己的this指向。
- 构造函数：指向其生成的实例对象。
- bind: 指向调用时第一个实参。当链式调用bind时，还是指向第一次调用时的第一个实参。当使用箭头函数调用bind时，this将不会变化，依然指向调用函数声明时外部作用域指向的this。
- apply、call: 指向调用时第一个实参。但是当调用的apply、call的函数为bind返回的结果时，this依然指向bind调用时的第一个参数。
- 引用类型调用： 指向调用函数的引用类型对象。
- 函数直接调用： 浏览器环境中指向Winodw,node环境中指向Global。
- 不在函数中输出this: 浏览器环境指向Window, node模块文件中指向module.exports

## 
```js
var a = 10

function fn1(){
    console.log(a)
}
        
function fn2(){
    var a = 20

    fn1()
}
fn2() // 10
// ----------------------------
var a = 10
        
function fn2(){
    var a = 20

    function fn1(){
        console.log(a)
    }

    fn1()
}
fn2() // 20
```
