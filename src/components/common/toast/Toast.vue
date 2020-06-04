<template>
  <div class="total" v-if="isShow">
     <div>{{message}}</div> 
  </div>
</template>

<script>
export default {
name:"Toast" ,
props:{
    message:{
        type:String,
        default:""
    },
    isShow:{
        type:Boolean,
        default:false
    }
},
  data () {
    return {
    };
  }
}

</script>
<style  scoped>
.total{
    position: fixed;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: rgba(0,0,0,.7);
    color:#FFF;
    z-index: 99;
    padding: 15px 20px;
}
</style>