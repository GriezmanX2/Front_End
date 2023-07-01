// 引入的不再是Vue构造函数，引入的是一个名为createApp的工厂函数
import { createApp } from 'vue'
import App from './App.vue'
// createApp(App) 创建应用实例对象app(类似于之前2中的vm，但比vm更轻)
createApp(App).mount('#app')
