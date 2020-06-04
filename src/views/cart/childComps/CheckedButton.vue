<template>
  <div class="check-button" :class="{active:isCheck}" >
    <img src="../../../assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckedButton",
  props: {
    isCheck: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    };
  },

  components: {},

  methods: {
     
  }
}

</script>
<style  scoped>
.check-button {
  position: relative;
  margin: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #ccc;
  cursor: pointer;
}

.active {
  border-color: #ff8198;
  background-color: #ff8198;
}
</style>