<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'TabBar',
  components:{
    
  }
}
</script>

<style scoped>
/*@import "../../../assets/css/normalize";*/
#tab-bar{
  display: flex;
  background-color: #f4f4f4;
  position: fixed;
  left:0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -2px 1px rgba(100,100,100,.2)
}

</style>
