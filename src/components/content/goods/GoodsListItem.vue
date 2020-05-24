<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="">
    <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
name: "GoodsListItem",
    props:{
        goodsItem:{
            type : Object,
            default(){
                return {}
            }
        }
    },
  data () {
    return {
    };
  }
}

</script>
<style  scoped>
.goods-item{
    padding: 5px;
    padding-bottom: 40px;
    position: relative;
    width: 48%;
}
.goods-item img{
    width: 100%;
    border-radius: 5px;  
}
.goods-info{
    position: absolute;
    bottom: 5px;
    left:0;
    right: 0;
    overflow: hidden;
    text-align: center;
    font-size: 12px;
}
.goods-info p{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
}
.goods-info .price{
    margin-right: 20px;
    color:var(--color-high-text);
}
.goods-info .collect{
    position: relative;
}
.goods-info .collect::before{
    content: "";
    width: 14px;
    height: 14px;
    position: absolute;
    left:-15px;
    top:-1px;
    background: url("../../../assets/img/common/collect.svg")  0/14px;
}
</style>