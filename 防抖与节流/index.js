// 防抖(debounce)与节流(throttle)



// 防抖函数在触发n秒后再执行回调，如果期间又被触发则重新计时。
function debounce(fn, delay){
  let timeout;
  return function(){
    let that = this
    let args = arguments
    clearTimeout(timeout)
    // timeout = setTimeout(function(){
    //   fn.apply(that, args)
    // }, delay)
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}

// 节流函数在一个单位事件内，只能有一次触发事件的回调函数执行，如果同一个单位事件内某事件被触发多次，只能有一次生效
function throttle(fn, delay){
  let timeout;
  return function(){
   if(!timeout){
     timeout = setTimeout(() => {
       timeout = undefined;
       fn.apply(this, arguments)
     }, delay)
   }
  }
}

/*
  防抖和节流函数的主要区别在于，
    防抖函数： 触发时机是根据最后一次触发事件的时间（使用场景: DOM元素拖拽、Canvas画笔，总的来说，适合大量事件平均分配触发）。
    节流函数： 触发时机是根据第一次触发事件的时间（使用场景： 防止表单多次重复提交，总的来说，适合多次事件一次响应的情况）。
*/