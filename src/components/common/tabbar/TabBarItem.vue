<template>
  <div class="tab-bar-item" @click = "itemClick">
    <div v-if="!isActive"><slot name = "item-icon"></slot></div>
    <div v-else><slot name = "item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name = "item-text"></slot></div>
  </div>
</template>
<script>
export default {
  name:"TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:"red"
    }
  },
  data(){
      return{
        // isActive:true,
      }
  },
  components:{
    
  },
  computed:{
    isActive(){
      //判断router里的path和当前的是不是一样的。是的话就让它处于活跃状态
      return this.$route.path.indexOf(this.path) != -1;
    },
    activeStyle(){
      //先判断是否处于活跃，处于活跃的更改颜色 
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods:{
    itemClick(){
      if (this.$route.path === this.path) return; //处理重复点击报错
      this.$router.replace(this.path);
    }
  }
}
</script>
<style scoped>
.tab-bar-item{
  flex:1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    margin-bottom: 2px;
    vertical-align: middle;
}

</style>

  