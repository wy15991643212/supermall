<template>
    <div>
        <swiper>
            <swiper-item v-for="(item,index) in banners" :key="index">
                <a :href="item.link"><img :src="item.image" alt="" @load="swiperLoad"></a>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper"

export default {
    name: "HomeSwiper",
    props: {
        banners: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            imgLoad:false
        };
    },
    components: {
        Swiper,
        SwiperItem
    },
    methods:{
        swiperLoad(){
            if(!this.imgLoad){
                // console.log("轮播加载完成")
                 this.$emit("homeSwiperLoad")
                 this.imgLoad = true;
            }
        }
    }

}

</script>
<style  scoped>

</style>