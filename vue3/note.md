# Vue3
## 相比Vue2
### 性能提升： 打包大小减少、初次渲染、更新渲染更快、内存占用减小
### 源码的升级
  - 使用Proxy代替defineProperty实现响应式
  - 重写虚拟DOM的实线和Tree-Shaking
### 拥抱TypeScript
  - Vue3可以更好的支持TS

### 新的特性
  1. Composition API(组合API)
    - setup配置
    - ref与reactive
    - watch与等watchEffect
    - provide与inject
### 其他改变
 - 新的生命周期钩子
 - data选项应该始终生命为一个函数
 - 移除keyCode支持作为v-on的修饰符

## 创建工程
1. 使用vue-cli创建
  ```powershell
    ## 查看版本确保@vue/cli版本在4.5.0以上
    vue --version
    npm install -g @vue/cli
    vue create vue3_test
    npm run serve
  ```


2. 使用vite创建
  npm init vite-app <project-name>
  cd <project-name>
  npm install
  npm run dev

  优势：
    - 开发环境中，无需打包操作，可快速的冷启动。
    - 轻量快速的热更新。
    - 真正的按需编译，不再等待整个应用编译完成。

## 编码
### setup
  ```js
    // 通过setup改变之前data,methods等写法。
    export default{
      name: 'home',
      props:[], // 父组件传递的自定义属性
      emits: [], // 父组件绑定的自定义事件名称
      // setup函数中props参数需要在同级属性props声明后才能接受到
      // context.attrs等同于2中的this.$attrs
      // context.emit等同于2中的this.$emit
      // context.slots等同于2中的this.$slots
      setup(props, context){
        let user = '吴竞'

        function hello(){
          return `你好,${user}`
        }
      }
    }


  ```
  setup在beforeCreate之前执行，this指向undefined

### ref()
  - 需要手动引入(import {ref} from 'vue')
  - 实现响应式，setup中的变量不会响应式更新到界面中，需要调用ref函数。
  - 语法： const xxx = ref(initValue)
    1. 创建一个包含响应式数据的引用对象（reference对象）
    2. JS中操作数据：xxx.value
    3. 模板中读取数据: {{xxx}},不需要读取value属性，底层会自动处理。
  - 备注：
    1. 接受的数据可以是借本类型，也可以是引用类型。
    2. 基本类型的数据： 响应式依然式依靠Object.defineProperty函数中的get函数和set函数完成的。
    3. 引用类型的数据： 内部使用了Vue3中的新函数reactive。

### reactive()
  - 需要手动引入(import {reactive} from 'vue')
  - 作用：定义一个引用类型的响应式数据。
  - 语法： const 代理对象 = reactive()，返回一个代理对象（Proxy实例）。
  - reative定义的响应式是深层次的，可以处理多层嵌套。
  - 内部基于ES6的Proxy实现，通过代理对象操作源对象内部数据。

### 响应式原理
  ```js
    const p = new Proxy({
      name: '吴竞',
      age: 31
    },{
      // 读取属性时调用
      get(target, propertyName){
        // return target[propertyName]
        return Reflect.get(target, propertyName)
      },
      // 对属性赋值时调用，也包含新增属性
      set(target, propertyName, value){
        // target[propertyname] = value
        Reflect.set(target, propertyName, value)
      },
      // 删除属性时调用
      deleteProperty(target, propertyName){
        // return delete target[properyName]
        return Reflect.deleteProperty(target, propertyName)
      }
    })
  ```

  ### 计算属性
    ```js
    import {reactive, computed} from 'vue'
      export default {
        name: 'demo',
        setup(props, context){
          let person = reactive({
            firstName: '吴',
            lastName: '竞'
          })

          // 简写形式——只读
          // let fullName = computed(() => {
          //   return person.firstName + '-' + person.lastName
          // })

          // 完整形式
          let fullName = computed({
            get(){

            },
            set(value){

            }
          })
        }
      }
    ```