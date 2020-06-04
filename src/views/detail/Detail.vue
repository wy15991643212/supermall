<template>
  <div id="detail">
    <detail-nav-bar ref="nav" class="detail-nav-bar" @titleClick="titleClick" />
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <dtail-swiper :top-img="topImg" />
      <detail-base-info :goods="goods" />
      <detail-shop :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" />
      <detail-param-info ref="param" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addToCar="addToCar" />
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <toast :message="toastMessage" :is-show="isShow"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar"
import { getDetail, Goods, Shop, paramInfo, getRecommend } from "@/network/detail"
import DtailSwiper from "./childComps/DtailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo"
import DetailBottomBar from "./childComps/DetailBottomBar"
import DetailShop from "./childComps/DetailShop"
import Scroll from "@/components/common/scroll/Scroll"
import Toast from "@/components/common/toast/Toast"
import BackTop from "@/components/content/backTop/BackTop"
import GoodsList from "@/components/content/goods/GoodsList"
import { imgListenerMixin } from "@/common/mixin"
import { debounce } from "@/common/untils"
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImg: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      navBarClick: [],
      navBarClickFunc: null,
      currentIndex: 0,
      isShowBackTop: false,
      toastMessage:null,
      isShow:false
    };
  },
  created() {
    //这里拿goodlistitem组件传过来的值，用this.$route.params.iid   是$route  不加s
    this.iid = this.$route.params.iid;
    //   console.log(this.iid)
    //根据iid 请求对应的数据

    getDetail(this.iid).then(res => {
      // console.log(res)
      const data = res.result
      this.topImg = data.itemInfo.topImages
      // 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //获取店铺信息
      this.shop = new Shop(data.shopInfo)
      //获取详情信息
      this.detailInfo = data.detailInfo
      //获取参数信息
      this.paramInfo = new paramInfo(data.itemParams.info, data.itemParams.rule)
      //获取评论数据
      if (data.rate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    //请求推荐数据
    getRecommend().then(res => {
      // console.log(res)
      this.recommends = res.data.list
    })
    this.navBarClickFunc = debounce(() => {
      this.navBarClick = []
      this.navBarClick.push(0)
      this.navBarClick.push(this.$refs.param.$el.offsetTop - 44)
      this.navBarClick.push(this.$refs.comment.$el.offsetTop - 44)
      this.navBarClick.push(this.$refs.recommend.$el.offsetTop - 44)
      //给数组最后放一个无穷大的数字，用于做滚动内容，对应标题的切换
      this.navBarClick.push(Number.MAX_VALUE)
      // console.log(this.navBarClick)
    }, 100)
  },
  methods: {
    imgLoad() {
      //图片加载完成后，调用scroll里的refresh() 重新计算高度
      this.$refs.scroll.refresh();
      this.navBarClickFunc();
    },
    titleClick(index) {
      // console.log(index)
      this.$refs.scroll.scrollTo(0, -this.navBarClick[index], 200)
    },
    contentScroll(position) {
      //监听scroll的滚动，拿到position。
      let positionY = -position.y;
      let length = this.navBarClick.length;
      // console.log(positionY)
      for (let i = 0; i < length - 1; i++) {
        //this.currentIndex !== i 这个判断是为了避免重复赋值（当this.currentIndex == i）的时候就不用赋值
        if (this.currentIndex !== i && (positionY >= this.navBarClick[i] && positionY < this.navBarClick[i + 1])) {
          //让当前的currentIndex 等于i,并且把当前的currentIndex赋值给nav里的currentIndex
          this.currentIndex = i;
          // console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      // 是否显示backTop
      this.isShowBackTop = Math.abs(position.y) > 1000
    },
    //返回顶部
    backClick() {
      //this.$refs.scroll 就指向绑定ref的组件对象
      //scrollTo 是BScroll 自带的属性滚动到指定的位置
      // console.log(this.$refs.scroll.msg)
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    //加入购物车
    addToCar(){
      const product = {}
      product.image = this.topImg[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // console.log(product)
      //把当前的product信息提交到vuex中的 mutations
      // this.$store.commit("addCarList",product)

      //把当前的product信息发送到vuex中的 actions  this.$store.dispatch
      this.$store.dispatch("addCarList",product).then( res =>{
          this.isShow = true
          this.toastMessage = res
          setTimeout(()=>{
            this.isShow = false
            this.toastMessage = ""
          },1500)
      })

      //添加购物车成功操作
      
      
    }
  },
  mixins: [imgListenerMixin],
  mounted() {
    // //图片加载完成的事件监听
    // const refresh = debounce(this.$refs.scroll.refresh, 200)
    // this.itemImgListener = () => {
    //    refresh()
    // }
    // this.$bus.$on("itemImgLoad", this.itemImgListener)

    //  放到了混入中
  },
  destroyed() {
    //上面利用mixin(混入),把home和这个页面里共同的 mounted 里的监听事件抽取出去
    //取消全局事件的监听
    this.$bus.$off("itemImgLoad", this.itemImgListener)
  },
  components: {
    DetailNavBar,
    DtailSwiper,
    DetailBaseInfo,
    DetailShop,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    BackTop,
    Toast
  }
}

</script>
<style  scoped>
#detail {
  background-color: #fff;
  position: relative;
  z-index: 10;
  height: 100vh;
}

.detail-nav-bar {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.content {
  height: calc(100% - 93px);
}
</style>