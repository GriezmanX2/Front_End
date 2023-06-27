// 该文件用于创建Vuex中最为核心的store
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

// 用于响应组件中的动作
// 组件中触发actions => this.$store.dispatch('add',params)
// 实际业务逻辑全部放在actions中进行处理
const actions ={
  add(context, value){
    context.commit('Add', value)
  }
}
// 用于数据操作
const mutations = {
  ADD(state, value){
    state += value
  }
}
// 用于存储数据
const state = {
  sum: 0
}
// 组件中取state中的值 => $store.state.sum

// 将state中的数据进行加工后返回值
// 组件中取值 => $store.getters.formateSum
const getters = {
  formateSum(state){
    return state.sum *9
  }
}

export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})