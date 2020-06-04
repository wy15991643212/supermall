<template>
    <div>
        <nav-bar>
            <div slot="left" class="back" @click="backClick">
                <img src="@/assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                <div v-for="(item,index) in titles" 
                :key="index" 
                :class="{active: currentIndex == index}"
                @click="titleClick(index)"
                class="title-item">{{item}}

                </div>
            </div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar"
export default {
    name: "DetailNavBar",
    data() {
        return {
            titles: ['商品', '参数', '评论', '推荐'],
            currentIndex:0
        };
    },

    components: {
        NavBar
    },
    methods: {
        titleClick(index){
            this.currentIndex = index;
            this.$emit("titleClick",index)
        },
        backClick(){
            this.$router.back();
        }
    }
}

</script>
<style  scoped>
.title{
    display: flex;
}
.title-item{
    flex:1;
    font-size: 14px;
    text-align: center;
}
.active{
    color:var(--color-high-text)
}
.back{
    position: relative;
}
.back img{
    width: 24px;
    height: 24px;
    position: absolute;
    left:50%;
    top: 10px;
    margin-left: -12px;
}
</style>