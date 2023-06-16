// 重写Promise

/*
  1.Promise就是一个类，在执行这个类时，需要传递一个函数，函数会立即执行。
  2.Promise中只有三种状态，分别为成功(fulfilled)、失败(rejected)、等待(pending),一旦状态改变就不可更改。
  3.resolve和reject函数用来改变状态,resolve=>fulfilled，reject=>rejected。
  4.then方法内部判断状态。如果状态为成功，调用成功回调函数。如果状态为失败，调用失败回调函数。
  5.then成功回调后有一个参数对应成功返回的值。失败回调后也有一个参数，表示失败原因。
*/
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class RePromise{
  constructor(executor){
    try {
      executor(this.reject,this.reject);
    } catch (error) {
      this.reject(error)
    }
  }
  // 初始默认状态
  status = PENDING;
  // 成功之后的值
  val = undefined;
  // 失败之后的原因
  reason = undefined;
  // 成功回调
  successCallback = [];
  // 失败回调
  failCallback = [];
  resolve = (val) => {
    // 如果状态不是等待，阻止继续执行
    if(this.status !== PENDING) return
    // 将状态更改为成功
    this.status = FULFILLED;
    this.val = val;
    // 判断成功回调是否存在，如果存在调用
    // this.successCallback && this.successCallback(this,val);
    // 考虑的存在多次调用then方法情况
    while(this.successCallback.length){
      this.successCallback.shift()();
    }
  }
  reject = (reason) =>{
    if(this.status !== PENDING) return
    // 将状态更改为失败
    this.status = REJECTED;
    this.reason = reason

    // this.failCallback && this.failCallback(this.reason);

    if(this.failCallback.length){
      this.failCallback.shift()();
    }
  }

  then(successCallback, failCallback){
    successCallback = successCallback ? successCallback : val => val;
    failCallback = failCallback ? failCallback : reason => { throw reason; };
    // 实线then方法的链式调用
    let promise2 = new RePromise((resolve, reject) => {
      // 判断状态
      if(this.status === FULFILLED){
        // 将代码转化为异步执行，避免同步执行时promise2还未完成赋值
        setTimeout(() => {
          try {
            let x = successCallback(this.val);
            // 判断x是否为promise实例
            // 如果不是，直接调用resolve
            // 如果是，查看实例返回的结果决定调用resolve还是reject
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        }, 0);

      }else if(this.status === REJECTED){
        // 将代码转化为异步执行，避免同步执行时promise2还未完成赋值
        setTimeout(() => {
          try {
            let x = failCallback(this.reason);
            // 判断x是否为promise实例
            // 如果不是，直接调用resolve
            // 如果是，查看实例返回的结果决定调用resolve还是reject
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        }, 0);
      }else{
        // 等待状态
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.val);
              // 判断x是否为promise实例
              // 如果不是，直接调用resolve
              // 如果是，查看实例返回的结果决定调用resolve还是reject
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          }, 0);
        });
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.reason);
              // 判断x是否为promise实例
              // 如果不是，直接调用resolve
              // 如果是，查看实例返回的结果决定调用resolve还是reject
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          }, 0);
        });
      }
    });

    return promise2;
  }

  catch(failCallback){
    return this.then(undefined, failCallback);
  }

  finally(callback){
    return this.then(val => {
      return RePromise.resolve(callback()).then(() => val);
    },reason => {
      return RePromise.resolve(callback()).then(() => { throw reason; });
    })
  }

  static all(arr){
    let rs = [];
    let index = 0;

    return new RePromise((resolve, reject) => {
      function addData(key, val){
        rs[key] = val;
        index++;
        if(index === arr.length) resolve(rs);
      }

      for(let i = 0;i < arr.length;i++){
        let cur = arr[i]
        if(cur instanceof RePromise){
          cur.then(val => addData(i, val), reason => reject(reason));
        }else{
          addData(i, array[i]);
        }
      }
    });
  }

  static resolve(val){
    if(val instanceof RePromise){
      return val;
    }else{
      return new RePromise((resolve, reject) => {
        resolve(val);
      })
    }
  }
}

function resolvePromise(promise2, x, resolve, reject){
  if(promise2 === x){
    return reject(new TypeError('Chaning cycle detected for promise #<Promise>'))
  }
  if(x instanceof RePromise){
    // x为promise实例
    x.then(resolve,reject);
  }else{
    // 非promise实例
    resolve(x);
  }
}

module.exports = RePromise