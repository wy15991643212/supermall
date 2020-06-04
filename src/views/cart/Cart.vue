<template>
  <div>
    <nav-bar class="nav-bar">
        <div slot="center">购物车({{carLength}})</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom></cart-bottom>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
import { mapGetters } from 'vuex'
import CartList from "./childComps/CartList"
import CartBottom from "./childComps/CartBottom"
export default {
  name: "Cart",
  data() {
    return {
    };
  },
  components:{
    NavBar,
    CartList,
    CartBottom
  },
  computed:{
      ...mapGetters(["carLength"])
  }
}

</script>
<style  scoped>
.nav-bar{
  background-color:var(--color-tint);
  text-align: center;
  color:#FFF;
}
</style>