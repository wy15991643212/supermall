<template>
  <div>
     <detail-nav-bar/>
     <dtail-swiper :top-img = "topImg"/>
     <detail-base-info :goods = "goods"/>
     <detail-shop :shop = "shop"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"
import {getDetail,Goods,Shop} from "@/network/detail"
import DtailSwiper from "./childComps/DtailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailShop from "./childComps/DetailShop"
export default {
name:"Detail" ,
  data () {
    return {
        iid:null,
        topImg:[],
        goods:{},
        shop:{}
    };
  },
  created(){
      //这里拿goodlistitem组件传过来的值，用this.$route.params.iid   是$route  不加s
      this.iid = this.$route.params.iid;
    //   console.log(this.iid)
      //根据iid 请求对应的数据
      
      getDetail(this.iid).then(res=>{
        //   console.log(res)
          const data = res.result
          this.topImg = data.itemInfo.topImages
           // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //获取店铺信息
        this.shop = new Shop(data.shopInfo)
      })
  },
  methods: {
  },
  components:{
      DetailNavBar,
      DtailSwiper,
      DetailBaseInfo,
      DetailShop
  }
}

</script>
<style  scoped>
</style>