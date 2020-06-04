<template>
  <scroll class="side-content">
    <div class="side-list">
      <div v-for="(item,index) in categories" :key="index" class="side-item" @click="itemClick(index)" :class="{active:index === currentIndex}">
        {{item.title}}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll"
export default {
  name: "SideBar",
  props: {
    categories: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  components: {
    Scroll
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit("selectItem", index)
    }
  }
}
</script>
<style  scoped>
.side-item {
  height: 45px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
}
.side-item.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
.side-content{
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
</style>