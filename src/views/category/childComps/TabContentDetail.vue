<template>
  <div class="tab-detail">
    <goods-list-item class="tab-detail-item" v-for="(item,index) in categoryDetail" :key="index" :goods-item="item"/>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem"
export default {
name: "TabContegoryDetail",
props:{
  categoryDetail:{
    type:Array,
    defualt:{
      return(){
        []
      }
    }
  }
},
  data () {
    return {
    };
  },

  components: {
    GoodsListItem
  },

  methods: {}
}

</script>
<style  scoped>
.tab-detail{
  display: flex;
  flex-wrap:wrap;
  justify-content: center;
}
.tab-detail .tab-detail-item{
  width: 45%;
}
</style>