
let _Vue = null
export default class VueRouter {
  static install(Vue) {
    // 1. 判断当前插件是否已经安装
    if(VueRouter.install.installed) return
    VueRouter.install.installed = true

    // 2. 把Vue构造函数记录到全局变量
    _Vue = Vue

    // 3. 把创建Vue实例时被传入的router对象注入到Vue实例上
    _Vue.minxs({
      beforeCreate() {
        if(this.$options.router){
          _Vue.prototype.$router = this.$options.router
        }
      }
    })
  }

  constructor(options) {
    this.options = options
    this.routeMap = {}
    this.data = _Vue.observable({
      current: '/',
    })
    this.init()
  }

  init() {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }

  createRouteMap() {
    // 遍历传入的所有路由规则，把路由规则解析成键值对的形式然后存储到routeMap中
    this.$options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  initComponents(Vue) {
    Vue.components('router-link', {
      props: {
        to: String,
      },
      // template: '<a :href="to"><slot></slot></a>',
      // 运行时版本Vue不支持template
      render(h) {
        return h('a', {
          attrs: {
            href: this.to,
          },
          on: {
            click: this.clickHandler,
          },
        }, [this.$slots.default])
      },
      methods: {
        clickHandler(e) {
          history.pushState({}, '', this.to)
          this.$router.data.current = this.to
          e.preventDefault()
        },
      },
    })

    const self = this
    Vue.component('router-view', {
      render(h) {
        const component = self.routeMap[self.data.current]
        return h(component)
      },
    })
  }


  initEvent() {
    window.addEventListener('popstate', _ => {
      this.data.current = window.location.pathname
    })
  }
}