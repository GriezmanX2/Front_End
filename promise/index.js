// eg.1
// const promise = new Promise((resolve, reject) => {
//   resolve(100);
// });

// promise.then(val => {
//   console.log('val', val);
// }, err => {
//   console.log('err', err);
// })

// // eg.2
function ajax(url){
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get',url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if(xhr.status === 200){
        resolve(xhr.response);
      }else{
        reject(new Error(xhr.statusText));
      }
    }

    xhr.send();
  });
}

// ajax('./users.json').then(res => {
//   console.log('res', res);
// }, err => {
//   console.log('err', err);
// })

// eg.3
const promise = new Promise((resolve, reject) => {
  resolve(100);
});

const promise2 = promise.then(
  function onFullfilled(val){
    console.log('val2', val);
    return ajax('./users.json')
  },
  function onRejected(err){
    console.log('err2',err)
  }
).then(
  function onFullfilled(val){
    console.log('val3', val);
    return ajax('./users.json')
  },
  function onRejected(err){
    console.log('err3',err)
  }
).then(
  function onFullfilled(val){
    console.log('val4', val);
  },
  function onRejected(err){
    console.log('err3',err)
  }
)