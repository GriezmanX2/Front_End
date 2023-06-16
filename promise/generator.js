// 生成器函数
function * start(){
  console.log('start');

  yield 'proceed'
}

const generator = start();
const result = generator.next();
console.log('result', result);