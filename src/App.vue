<template>
  <div id="app">
    <!--exclude="Detail" 把Detail 排除在外。每次点击退出，Detail不需要缓存记录数据-->
    <keep-alive exclude="Detail">
       <router-view/>
    </keep-alive>
     
      <main-tab-bar/>
  </div>
</template> 

<script>
import MainTabBar from "@/components/content/maintabbar/MainTabBar"
export default {
  name: 'App',
  components:{
    MainTabBar
  }
}
</script>

<style>
@import "./assets/css/normalize";
@import "./assets/css/base";
</style>
