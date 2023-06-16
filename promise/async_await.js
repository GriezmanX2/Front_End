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

async function  main(){
  const users = await ajax('./users.json');
  console.log('users', users);

  const posts = await ajax('./users.json');
  console.log('posts');
}

main();
