import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  // 运行时版本Vue缺少模板解析器，无法解析template
  render: h => h(App),
}).$mount('#app')
