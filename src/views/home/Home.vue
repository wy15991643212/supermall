<template>
    <div id="home">
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <tab-control class="fixed" ref="tabControl2" :titles="['流行','新款','精选']" @tabClick="homeTabclick" v-show = "isTabControlShow"/>
        <scroll class="content" ref="scroll" @scroll="contentScroll" @pullingUp="loadMore" :pull-up-load="true" :probe-type="3">
            <home-swiper :banners="banners" class="home-swiper" @homeSwiperLoad="swiperLoad"></home-swiper>
            <recommend-views :recommends="recommends" />
            <feature-view/>
            <tab-control :titles="['流行','新款','精选']" ref="tabControl1" @tabClick="homeTabclick" />
            <goods-list :goods="showGoodsList" />
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop" />
    </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import Scroll from "@/components/common/scroll/Scroll"
import TabControl from "@/components/content/tabcontrol/TabControl"
import GoodsList from "@/components/content/goods/GoodsList"
import BackTop from "@/components/content/backTop/BackTop"

import HomeSwiper from "./childComps/HomeSwiper"
import RecommendViews from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"
import { getHomeMultidata, getHomeGoods} from "@/network/home"
import {imgListenerMixin} from "@/common/mixin"
export default {
    name: "Home",
    data() {
        return {
            result: null,
            banners: [],
            recommends: [],
            goodsList: {
                "pop": { page: 0, list: [] },
                "new": { page: 0, list: [] },
                "sell": { page: 0, list: [] },
            },
            currentType: 'pop',
            tabOffsetTop: 0,
            isTabControlShow:false,
            saveY:0,
            isShowBackTop:false
            
        };
    },
    components: {
        NavBar,
        TabControl,
        GoodsList,
        HomeSwiper,
        RecommendViews,
        FeatureView,
        Scroll,
        BackTop

    },
    computed: {
        showGoodsList() {
            return this.goodsList[this.currentType].list
        }
    },
    created() {
        //请求多个数据
        this.getHomeMultidata();
        // 请求商品数据
        this.getHomeGoods("pop");
        this.getHomeGoods("new");
        this.getHomeGoods("sell");
    },
    mixins:[imgListenerMixin],
    mounted() {
        // //图片加载完成的事件监听
        // const refresh = debounce(this.$refs.scroll.refresh, 200)
        // this.itemImgListener = () => {
        //     // 监听goodsListItem中图片加载完成 ,完成后更新BScroll 的scrollerHeight
        //     //    this.$refs.scroll && this.$refs.scroll.refresh();
        //     refresh()
        // }
        // this.$bus.$on("itemImgLoad", this.itemImgListener)

        // 内容放入了mixin(混入)中
        
    },
    activated(){
        //keep-alive是Vue提供的一个抽象组件，用来对组件进行缓存,在app.vue中包裹了 <router-view/>
        //进入 
        //离开时记录当前滚动的位置，再进入时，直接滚动到记录的位置
        //进入的时候 refresh()（重新计算 BetterScroll，确保滚动不会出现问题）
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    deactivated(){
        //离开保存Y值
        this.saveY = this.$refs.scroll.getScrollY()
        //取消全局事件的监听
        this.$bus.$off("itemImgLoad",this.itemImgListener)
    },
    methods: {
        //监听轮播图片是否加载完成
        swiperLoad() {
            // console.log(this.$refs.tabControl1.$el.offsetTop)
            //加载完成后，获取tabControl的offsetTop
            this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
        },
        homeTabclick(index) {
            switch (index) {
                case 0:
                    this.currentType = 'pop'
                    break;
                case 1:
                    this.currentType = 'new'
                    break;
                case 2:
                    this.currentType = 'sell'
                    break;

            }
            //tabControl 里有currentIndex这个属性，记录当前点击的是哪一个。两个tabControl的变成同一个
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
        },
        contentScroll(position) {
            //当滚动距离超过1000的时候，显示返回顶部按钮
            this.isShowBackTop = Math.abs(position.y) > 1000

            //当滚动距离为tabOffsetTop 的时候，应该让上面的tabControl显示出来
            // console.log(position)
            //  console.log(this.tabOffsetTop)
            this.isTabControlShow = position.y < -this.tabOffsetTop
        },
        //上拉加载更多
        loadMore() {
            //上拉的时候直接用getHomeGoods请求数据的方法，判断是哪个类型用currentType
            this.getHomeGoods(this.currentType);
            //多次加载更多
            this.$refs.scroll.finishPullUp();
        },
        //返回顶部
        backClick() {
            //this.$refs.scroll 就指向绑定ref的组件对象
            //scrollTo 是BScroll 自带的属性滚动到指定的位置
            // console.log(this.$refs.scroll.msg)
            this.$refs.scroll.scrollTo(0, 0, 1000);
        },
        //网络请求
        getHomeMultidata() {
            getHomeMultidata().then((res) => {
                this.result = res;
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;

            }).catch((err) => {
                // console.log(err)
            });
        },
        getHomeGoods(type) {
            const page = this.goodsList[type].page + 1;
            getHomeGoods(type, page).then(res => {
                // console.log(res);
                this.goodsList[type].list.push(...res.data.list);
                this.goodsList[type].page += 1;
            })
        }
    }

}

</script>
<style  scoped>
.home-nav {
    position: relative;
    z-index: 10;
    background-color: var(--color-tint);
    text-align: center;
    color: #FFF;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
}

#home {
    height: 100vh;
}
.tab-control {
    position: relative;
    z-index: 8;
}
 .fixed {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
  }
.content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>