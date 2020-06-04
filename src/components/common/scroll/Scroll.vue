<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import Bscroll from "better-scroll"
export default {
    name: "Scroll",
    data() {
        return {
            scroll: null,
            probeType: {
                type: Number,
                default: 0
            },
            pullUpLoad: {
                type: Boolean,
                default: false
            }
        };
    },
    methods: {
        scrollTo(x, y, time) {
          this.scroll && this.scroll.scrollTo(x, y, time)
        },
        //包装finishPullUp让外部使用,
        //默认上拉加载更多是只有一次，必须调用finishPullUp，才可以多次加载更多
        finishPullUp() {
            this.scroll.finishPullUp();
        },
    //    图片加载完成后更新高度
        refresh() {
            // console.log(this.scroll)
            //  console.log("节流测试")
           this.scroll &&  this.scroll.refresh();
        },
        getScrollY(){
            return this.scroll ? this.scroll.y :0
        }

    },
    mounted() {
        //创建scroll对象
        this.scroll = new Bscroll(this.$refs.wrapper, {
            click: true,
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad
        })
        // 监听滚动的位置
        this.scroll.on("scroll", (position) => {
            // console.log(position)
            this.$emit("scroll", position)
        })
        //上拉加载更多
        this.scroll.on("pullingUp", () => {
            this.$emit("pullingUp")
        })

    }
}

</script>
<style  scoped>

</style>