// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
//添加事件总线 Vue.prototype.$bus = new Vue();
// 组件触发方法：this.$bus.$emit("方法名")
// 组件接受方法并调用:this.$bus.$on("方法名", ()=>{});
Vue.prototype.$bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
