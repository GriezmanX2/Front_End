
# Vue相关

## 绑定事件
  1. 绑定事件禁用箭头函数，避免无法获取到Vue实例
  2. @click=customEvent(param,$event) => 通过$event传递事件对象

### 事件修饰符
  1. @eventName.prevent 阻止默认行为
  2. @eventName.stop 阻止事件冒泡
  3. @eventName.once 事件只触发一次
  4. @eventName.capture 使用事件捕获
  5. @eventName.self 只有event.target为绑定事件元素时才触发事件
  6. @eventName.passive 事件的默认行为立即执行，不等待事件回调执行完毕

#### 键盘事件
###### 按键别名：
  1. 回车 => enter
  2. 删除 => delete (捕获删除和退格键)
  3. 返回 => esc
  4. 空格 => space
  5. 换行 => tab
  6. 上 => up
  7. 下 => down
  8. 左 => left
  9. 右 => right
  10. Vue未提供别名的按键可以使用按键原始的key值去绑定，但要注意转为kebab-case(短横线命名：CapsLock => caps-lock)
  11. 系统修饰键: ctrl、alt、shift、meta
  12. 可以直接使用keyCode
  13. Vue.config.keysCodes.自定义键名 = 键码，可以自定义按键别名

## 计算属性Computed

  ```js
  computed: {
    fullName: {
      // get只在初次读取时和所依赖的数据发生变化时调用。对比methods，存在内部缓存机制，效率更高。
      get(){
        return this.firstName + ' ' + this.lastName;
      },
      // 非必需，但是缺少set时对计算属性赋值会导致报错。
      set(val){
        const arr = val.split(' ');
        this.firstName = arr[0];
        this.lastName = arr[1];
      }
    }
  }
  ```

## 监视属性Watch

  ```js
  // data、computed属性均可以监视
  watch: {
    isHot: {
      // 当isHot发生变化时，调用handler
      handler(newVal,oldVal){

      },
      // 初始化时是否执行，默认为false
      immediate: false,
      // 深度监视，监视多级结构中所有属性的变化
      deep: true
    },
    'cusProperty.cusAttrName'(newVal, oldVal){

    }
  }

  // computed与watch可以完成某些同样的任务。涉及到多个依赖属性时，computed更优。但涉及到异步操作时，只能通过watch完成。
  ```

## 绑定类名
  ```html
  <!-- 动态类通过:绑定 -->
  <!-- 绑定class--字符串写法 适用于：样式的类名不确定 -->
  <div class="basic" :class="classVariable"></div>
  <!-- 绑定class--数组写法 适用于：绑定的样式个数不确定、名字也不确定 -->
  <div class="basic" :class="[ classString1, classString2, classString3, ... ]" ></div>
  <!-- 绑定class--对象写法 适用于绑定的样式个数确定，类名也确定，但需要动态决定是否启用 -->
  <div class="basic" :class="{classString1: true, classString2: false, classString3: false, ...}"></div>
  ```
## 绑定样式
  ```html
  <div :style="{'font-size': fontSizeVariable}"></div>
  <div :style="[styleObj1, styleObj2, styleObj3, ...]"></div>
  ```

## 列表循环渲染

  1. 虚拟DOM中key的作用：key时虚拟DOM对象的标识，当数据发生变化时，Vue会根据新数据生成新的虚拟DOM，随后Vue会进行新旧虚拟DOM的差异比较。
  2. 对比规则：旧中找到了与新的相同的key，若虚拟DOM中内容没变，直接俄使用之前的真实DOM。若虚拟DOM中内容变了，则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
  3. 使用index作为key可能会引发的问题：
    1. 若对数据进行逆序添加、逆序删除等破环顺序的操作，会产生没有必要的真实DOM更新。
    2. 如果结构中还包含输入类的DOM，会产生错误DOM更新。
  4. 开发中最好使用每条数据的唯一标识作为key，比如id、手机号、身份证号等。如果不存在对数据进行逆序添加等破环顺序的操作，仅用于渲染列表展示，使用index作为key不会产生问题。

## 响应式原理

  手动添加响应式属性： vm.$set(ObjName, attrName, attrValue);
  无法直接给vm或vm._data添加属性。

  数组响应： push pop shift unshift splice sort reverse, 直接修改数组中某个元素无法触发响应式，Vue通过重写数组方法实现监听响应式。其中Vue做了两件事，第一调用原生对应的方法进行数组操作，第二重新解析模板，进行更新页面。filter concat slice不会改变原数组，所以Vue没有对其进行重写，通过对原数组进行重新赋值完成响应式。

## 表单输入绑定
### 修饰符
  .lazy oninput => onchange
  .number 数据类型从字符串转化为数字
  .trim 绑定值去掉前后空格

## 过滤器
  对要显示的数据进行特定格式化后在显示，并不会改变调用变量。
### 局部过滤器
  {{ time | filterName(params2) }}

  filters: {
    filterName(value，params2){
      return
    }
  }

  过滤器函数收到的第一个形参固定为过滤器处理的变量，第二个形参为自定义传入的第一个实参。

  {{ time | filterName1 | filterName2 }}
  过滤器可以从左到右传递调用，下一个过滤器接收到的value为上一个过滤器的返回值。

### 全局过滤器
Vue.filter(filterName, function(value){
  return;
});


## 内置指令
  v-text
  v-html 可能存在安全性问题，导致XSS攻击。
  v-cloak 配合[v-cloak]样式避免出现未解析模板的问题，vue接入瞬间会删除掉绑定元素的v-cloak属性。
  v-once 绑定元素在初次动态渲染后，就视为静态类容了，以后数据的改变不会引起视图的更新。
  v-pre 跳过其绑定元素的编译过程，可利用其跳过没有使用指令语法、没有使用插值语法的元素，会加快编译。

## 自定义指令
### 局部自定义指令
  ```js
  directives:{
    // 指令函数调用时机： 1. 指令与元素成功绑定时。 2. 指令所在的模板被重新解析时。
    // 参数: 1.绑定指令的真实DOM元素 2. 指令绑定关系对象
    // 指令名如果为多个单次使用kebab-case命名方式
    // 指令相关函数中的this都指向Window

    // 函数式声明
    directiveName(element, binding){

    }

    // 对象式声明
    directiveName: {
      // 当指令与元素成功绑定时
      bind(element, binding){

      },
      // 指令绑定元素被插入页面时
      inserted(element, binding){

      },
      // 指令所在的模板被重新解析时
      update(element, binding){

      }
    }
  }
  ```
### 全局自定义指令
  ```js
  Vue.directive(directiveName,{
    // 当指令与元素成功绑定时
    bind(element, binding){

    },
    // 指令绑定元素被插入页面时
    inserted(element, binding){

    },
    // 指令所在的模板被重新解析时
    update(element, binding){

    }
  });
  ```

## Vue-Cli
安装脚手架 npm i -g @vue/cli
创建前端工程 vue create project-name

项目结构：
  文件夹：
    assets 存放静态文件
    components 存放组件

  文件：
    main.js 项目入口文件
    index.html

  vue.js与vue.runtime.xxx.js的区别：
    1. vue.js时完整版的Vue，包含核心功能和模板解析器。
    2. vue.runtime.xxx.js时运行版的Vue，只包含：核心功能，没有模板解析器。

    因为运行版没有模板解析器，所以不能使用template配置项，需要使用render函数接收到的createElement函数去渲染指定具体内容。

## $nextTick
  this.$nextTick(callback): 在下一次DOM更新结束后执行指定的回调。

## 过渡与动画(ToDo: 初略待官网学习完善[https://cn.vuejs.org/guide/built-ins/transition.html#reusable-transitions])
  ```html
    <template>
      <!-- appear布尔值控制是否初次渲染时应用过度效果 -->
      <transition name="transitionName" :appear="true">
        <h1 v-show="isShow">进入退出动画示例</h1>
      </transition>
    </template>

    <style>
      /* 通过name命名transition时 将v替换为name值 */
      .v-enter-active{
        animation: ex .5s linear;
      }
      .v-leave-active{
        animation: ex .5 linear reverse;
      }

      @keyframes ex{
        from{
          translateX: -100%;
        }
        to{
          translateX: 0;
        }
      }
    </style>
  ```

## devSever.proxy
  devServer: {
    proxy: {
      '/path1': {
        target: targetUrl,
        ws: true, // 是否支持websocket
        changeOrigin: true, // 用于控制代理请求头中的host值是否为目标域名
        pathRewrite: {'^/needlessPath': ''} // 重写代理请求实际路径
      },
    }
  }

## 插槽
  1. 默认插槽
    父组件:
      <子组件>传递给子组件插槽的内容</子组件>
    子组件中:
      <slot>默认值</slot>
  2. 具名插槽
    父组件：
      <子组件>
        <ele slot="slotName1"/>
        <ele slot="slotName2"/>
      </子组件>
    子组件：
      <slot name="slotName1"></slot>
      <slot name="slotName2"></slot>

  slot可以使用与<template></template>
  可简写为<template v-slot:slotName1></template> // 简写方法只可作用于template
  3. 作用域插槽(ToDo缺少实际理解掌握)
    // 父组件通过插槽调用子组件中的变量
    父组件:
      <子组件>
        <template scope="scopeObj">
          <!--  scope属性写法可更新为slot-scope -->
          <!-- 作用域插槽也可以具名 -->
          <ul>
            <li v-for="item in scopeObj.attrName">{{item.name}}</li>
          </ul>
        </template>
      </子组件>
    子组件：
      <slot :attrName="variableName"></slot>

## Vuex
  概念：专门在Vue中实线集中式状态数据管理的插件，对应用中多个组件的共享状态进行集中式的读写，也是一种组件间通信方式，且适用于在任意组件中通信。
  使用场景：1.多个组件依赖于同一状态。
  使用： Actions => Mutations => State。

### mapState mapGetters
  ```js
  import {mapState, mapGetters} from 'vuex'

  export default {
    computed:{
      ...cusState,
      ...cusGetters
    },
    mounted(){
      const cusState = mapState({vairableName: stateAttrName})
      // 当变量名和属性名相同时，可以如下简写
      // const cusState = mapState([vairableName1,vairableName2,vairableName3])
      const cusGetters = mapGetters({vairableName: stateAttrName})
    }
  }
  ```
### mapActions mapMutations
  ```js
  // 值通过调用methodName调用时传参
  import {mapActions, mapMutations} from 'vuex'
  export default {
    methods: {
      ...mapActions(methodName: actionName),
      ...mapMutations(methodName: mutationName)
    },
    mounted(){
      const cusActions = mapActions({methodName: actionName})
      // 当变量名和属性名相同时，可以如下简写
      // const cusState = mapActions([methodName1,methodName2,methodName3])
      const cusMutations = mapMutations({methodName: mutationName})
    }
  }
  ```
### Vuex模块化
  ```js
  import {mapState, mapActions} from 'vues'
  const vuex1Options = {
    namespaced: true,  // 确保启用模块化命名空间
    actions: {},
    mutations: {},
    state: {},
    getters: {}
  }
  export default new Vuex.Store({
    modules:{
      moduleName1: vuex1Options,
      moduleName2: vuex2Options
    }
  })

  // 获取
  export default{
    computed: {
      ...mapState(moduleName1,[attrName1,attrName2,...])
    },
    methods: [
      ...mapActions(moduleName1,{methodName1,methodName2,...})
    ]
  }
  ```
