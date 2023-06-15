# 前后端交互
  ## 传统表单问题
    - 为了获取数据，需要重新加载页面，浪费资源，性能差。
    - 验证表单结果时，一项内容不合格，表单内容需要全部重新输入，体验不好。

  ## 解决问题：
    · ajax全名async javascript and XML
    - 提供了不重新加载页面即可完成前后台交互的能力。
    - 默认异步执行机制。


  ## AJAX使用方法:
    ```js
      const xhr = new XMLHttpRequest();
      xhr.open('get/post',请求地址,true); // 方法名未避免某些浏览器出现问题，建议全都使用大写。get方法通过url?传参

      xhr.setRequestHeader('content-type', 'application/x-wwww-form-unlencoded');
      // 设置传参格式,get请求无需设置。
      // form编码 name=wujing&age=31 -> application/x-wwww-form-unlencoded
      // json {name: 'wujing', age: '31'} -> application/json

      xhr.send(数据?); // post通过传参传递数据

      xhr.onload(()=> {
        if(/^2\d{2}$/.test(xhr.status)){
          console.log(JSON.parse(xhr.responseText));
        }else{
          console.log('error:', xhr.responseText);
        }
      });
    ```

  ## Fetch使用方法:
    ```js
      fetch(请求地址,{
        method: 请求方法, // get post
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          name: 'wujing'
        })// 请求传参
      }).then(res => {
        if(res.ok){
          return res.json(); //.json()或.text()方法返回一个结果为返回数据的Promise
        }elsee{
          return Promise.reject({
            status: res.status,
            statusText: res.statusText
          });
        }
      }).then(json => {
        console.log('json', json);
      }).catch(err => {
        console.log('err', err);
      });
    ```

  ## axios:一个基于promise的http库。
  使用方法:

    ```js
      axios.post('https://tenapi.cn/v2/yiyan?format=json',{
        params: {
          name: 'wujing',
          age: 31
        }
      }).then(res => {
        const data = res.data;
        console.log('data', data);
      })

      axios({
        method: 'post',
        url: 'https://tenapi.cn/v2/yiyan',
        data: {
          name:'wujing',
          age: 31
        }
      }).then(res => {
        const data = res.data;
        console.log('data', data);
      })
    ```

  axios拦截器:

    ```js
      // 请求拦截器
      axios.interceptors.request.use(config => {
        // 发送请求之前对请求参数进行处理
        return config
      },err => {
        return Promise.reject(err)
      })

      // 回复拦截器
      axios.interceptors.response.use(res => {
        // 获取返回结果之前对结果进行处理
        return res
      }, err => {
        return Promise.reject(err)
      })

      // 中断器
      const controller = new AbortController();
      axios({
        method: 'post',
        url: 'https://tenapi.cn/v2/yiyan',
        data: {
          name:'wujing',
          age: 31
        },
        signal: controller.signal
      }).then(res => {
        const data = res.data;
        console.log('data', data);
      })
      controller.abort();
    ```

  ## 同源策略(Same Origin Policy)
  协议、域名、端口只有这三个完全相同的url才能称之为同源，否则会涉及到跨域问题。
  1. 无法读取非同源页面的Cookie、LocalStorage。
  2. 无法获取非同源页面的DOM。
  3. 无法向非同源页面发送AJAX请求（可以发送，但回复会被浏览器依据同源策略拦截）。

  ## 跨域解决方法
  1. JSONP(JSON with Padding)
    - script没有跨域限制。
    - 前端提前声明好调用函数。
    - 后端配合返回的是约定好的函数调用。
    示例:
    ```js
    // 处理返回结果函数
    function test(data){
      console.log('data', data);
    }

    const nscript = document.createElement('script');
    nscript.src = 'https://wwww.whatever.com?jsonpcallback=test';
    document.body.appendChild(nscript);
    ```
  缺点：
  - 只能做GET请求。
  - 前后端都需要做对应处理。

  2. 设置后端响应头字段: Access-Control-Allow-Origin: *或者具体url

  3. 反向代理：nginx、dev-server，因为同源策略是浏览器策略，后端之间不存在跨域问题。
