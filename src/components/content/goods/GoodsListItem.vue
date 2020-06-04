<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImg" alt="" @load="imgLoad">
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
  },
  computed:{
      // 因为detailComment页面复用了这个组件。两个数据img的路径不一样，所以在计算属性这里判断一下
      //this.goodsItem.image 是detailComment 页面用的
      //this.goodsItem.show.img 是home里用的
        showImg(){
          return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
        }
  },
  methods:{
      //监听图片加载完成
      imgLoad(){
       //图片加载完成后，使用事件总线this.$bus.$emit("方法名")，发射事件,再在home里接收
       this.$bus.$emit("itemImgLoad");
      },
      itemClick(){
          this.$router.push('/detail/' + this.goodsItem.iid)
      }
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