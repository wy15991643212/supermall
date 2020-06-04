import Vue from "vue"
import Vuex from "vuex"
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"
//使用Vuex
Vue.use(Vuex)
// state,mutations,actions 把抽取封装到单个文件中
const state = {
    carList: []
}
//创建Store对象
const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
// 挂载到Vue实例上
export default store