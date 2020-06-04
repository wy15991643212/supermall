<template>
  <div class="bottom-bar">
        <div class="left-box">
            <div class="icon">
                <i class="service"></i>
                <span>客服</span>
            </div>
            <div class="icon">
                <i class="shop"></i>
                <span>店铺</span>
            </div>
            <div class="icon">
                <i class="collect"></i>
                <span>收藏</span>
            </div>
        </div>
        <div class="right-box">
            <div class="cart" @click="addToCar">加入购物车</div>
            <div class="buy">购买</div>   
        </div>
  </div>
</template>

<script>
export default {
name: "DetailBottomBar",
  data () {
    return {
    };
  },
  methods:{
      addToCar(){
          this.$emit("addToCar");
      }
  }
}

</script>
<style  scoped>
.bottom-bar{
    display: flex;
    height: 49px;
    background-color: #fff;
    position: fixed;
    bottom:0;
    left: 0;
    right: 0;
}
.left-box,.right-box{
    width: 50%;
    display: flex;
    text-align: center;
}
.left-box .icon{
    flex:1;
    text-align: center;
    font-size: 13px;
}
.left-box .icon i{
    flex:1;
    display: block;
    width: 22px;
    height: 22px;
    background: url("../../../assets/img/detail/detail_bottom.png") 0 0/100%;
    margin:6px auto 3px;
}
.left-box .icon i.service{
    background-position: 0 -54px;
}
.left-box .icon i.shop{
    background-position: 0 -98px;
}
.cart,.buy{
    flex:50%;
    line-height: 49px;
    font-size: 15px;
    background-color: #ffe817;
    color: #333;
}
.buy{
    background-color: #f69;
    color:#FFF;
}
</style>