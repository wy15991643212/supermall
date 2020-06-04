<template>
  <scroll class="content" ref="scroll">
    <carr-list-item v-for="(item,index) in carList" :key="index" :product="item" :index="index"/>
  </scroll>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll"
import CarrListItem from "./CartListItem"
import { mapGetters } from "vuex"
export default {
  name: "CartList",
  data() {
    return {
    };
  },

  components: {
    Scroll,
    CarrListItem
  },
  computed: {
    ...mapGetters(["carList"])
  },
  activated(){
    //进入到购物车界面，再次刷新一下BScroll 的高度
    this.$refs.scroll.refresh()
  }
}

</script>
<style  scoped>
.content {
  height: calc(100vh - 44px - 49px - 40px);
  overflow: hidden;
}
</style>