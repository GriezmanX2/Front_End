# TypeScript
## TS是什么
- 以JS为基础构建的语言。
- 一个JS的超集。
- 可以在任何支持JS的平台中执行。
- 拓展了JS并添加了类型限制。
- TS不能被JS解析器执行，需要被转化为JS后执行。

## 语法规则
### 限制变量类型
```ts
// 声明一个num变量并指定它的类型为number
let num: number =  9
// 给num赋予其他类型的值会导致警告
num = 'number'
// -----------------
// 如果声明时没有指定类型，ts会根据首次赋值的变量类型进行指定。
let str = 'char'
// 给string类型的变量str赋予number类型的值会导致警告
str = 123
// -----------------
// 两个形参类型指定为number,返回结果类型指定为number
function sum(a: number,b: number): number{
    return a + b
}
sum(123,456)
// 字符串类型参数不符合形参类型声明导致警告
sum(123,'456')
// 参数个数与函数声明时不匹配导致警告
sum(123, 456, 789)
// void 表示空，修饰函数返回值时表示函数没有返回值
function fn(): void(){

}
// never表示函数永远不会返回结果
function fn2(): never(){
    throw new Error('错误')
}
// {} 用来指定对象中可以必须且只能包含哪些属性
// 语法： {属性名: 属性值}
// 属性名后边加上？表示属性是可选的
// [propName: string]: any 拓展任意类型的属性
let obj: {name: string, age?: number}
// let obj: {name: string,[propName: string]: any}
限制函数fn的参数与返回值都为number
// let fn: (a: nubmer,b: number) => number
// 声明一个只能包含string类型变量的数组
let strArr: string[]
// let strArr: Array<string>

// 声明必须且只能包含两个元素的元组，其中第一个元素是字符串类型，第二个元素为数字类型
let t = [string, number]

// 枚举
enum Gender{
    Male = 0,
    Female = 1
}
let i: {name: string, gender: Gender}
i = {
    name: 'firmino',
    gender: Gender.Male
}

// 类型的别名(自定义类型，提升可复用性)
type myType = 1 | 2 | 3
// 等同于 let k: 1 | 2 | 3
let k: myType
```
|  类型 |    例子  | 描述 |
|  ----- |   --- |   --- |
| number| 1, 2 | 任意数字|
| string| 'str' | 任意字符串 |
|boolean | true,false| 布尔值|
| 字面量 |  10, 'hi'|  限制字面量是其本身，附单个值时类似于常量，附多个值时通过'|'连接，限制值为其中某个|
| any| 任意类型 | 任意类型 |
| unknown| 任意类型 | 类型安全的any|
| void|空值（undefined） | 没有值或undefined|
| never | 没有值 | 不能是任何值 |
| object| { name: 'wujing'} | 任意对象 |
| array |[1, 2, 3, 1, 5] | 任意数组 |
| tuple| [4, 5] |元组，TS新增类型，固定长度数组|
| enum| enum(A, B) | 枚举，TS中新增类型 |

## 面向对象
## 泛型
- 在定义函数或是类时，如果遇到类型不明确的就可以使用泛型
```ts
function fn<T>(a: T): T{
    return a;
}

fn<string>('hi')

function fn2<T, K>(a: T, b: K): T{
    return a
}
fn2<number, string>(123, 'str')

function fn3<T extends Array>(a: T): number{
    return a.length
}
fn3([1, 2, 3])
```