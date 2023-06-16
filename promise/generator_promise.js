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

function * main(){
  const users = yield ajax('./users.json');
  console.log('users', users);

  const posts = yield ajax('./users.json');
  console.log('posts');
}

const g = main();
const rs = g.next();

rs.value.then(data => {
  g.next(data);
});