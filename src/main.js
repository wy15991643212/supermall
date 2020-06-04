// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store"
import VueLazyload from 'vue-lazyload'

import FastClick from "fastclick"

Vue.config.productionTip = false
//添加事件总线 Vue.prototype.$bus = new Vue();
// 组件触发方法：this.$bus.$emit("方法名")
// 组件接受方法并调用:this.$bus.$on("方法名", ()=>{});
Vue.prototype.$bus = new Vue();

// 解决移动端300ms 延迟  
FastClick.attach(document.body);

//使用懒加载  把图片里的src 属性改为  v-lazy="src"
Vue.use(VueLazyload,{
  loading:require("./assets/img/common/placeholder.png")
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
