<template>
    <div>
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <home-swiper :banners="banners" class="home-swiper"></home-swiper>
        <recommend-views :recommends="recommends" />
        <feature-view/>
        <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="homeTabclick" />
        <goods-list :goods="showGoodsList" />
        <div style="height:1000px;"></div>
    </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"

import TabControl from "@/components/content/tabcontrol/TabControl"
import GoodsList from "@/components/content/goods/GoodsList"

import HomeSwiper from "./childComps/HomeSwiper"
import RecommendViews from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"
import { getHomeMultidata, getHomeGoods } from "@/network/home"
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
        };
    },
    components: {
        NavBar,
        TabControl,
        GoodsList,
        HomeSwiper,
        RecommendViews,
        FeatureView
    },
    computed:{
        showGoodsList(){
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
    methods: {
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
    background-color: var(--color-tint);
    text-align: center;
    color: #FFF;
    box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
}

.home-swiper {
    padding-top: 44px;
}

.tab-control {
    position: sticky;
    top: 43px;
    left: 0;
    right: 0;
    background-color: #FFF;
    z-index: 8;
}
</style>