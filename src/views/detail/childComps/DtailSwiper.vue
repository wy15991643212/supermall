<template>
  <div>
      <swiper class="swiper-content">
          <swiper-item v-for="(item,index) in topImg" :key="index" class="swiper-item">
           <img :src="item" alt="">
          </swiper-item>
      </swiper>
  </div>
</template>

<script>
import {Swiper,SwiperItem} from "@/components/common/swiper"
export default {
name: "DtailSwiper",
  data () {
    return {
    };
  },
  props:{
      topImg:{
          type:Array,
          default(){
              return []
          }
      }
  },
  components: {
      Swiper,
      SwiperItem
  },
  methods: {}
}
</script>
<style  scoped>
.swiper-content{
    height: 260px;
    overflow: hidden;
}
</style>