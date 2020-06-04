<template>
    <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
        <div class="info-desc clear-fix">
            <div class="start left"></div>
            <div class="desc">{{detailInfo.desc}}</div>
            <div class="end right"></div>
        </div>
        <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
        <div class="info-list">
            <img 
            :src="detailInfo.detailImage[0].list[index]" 
            v-for="(item,index) in detailInfo.detailImage[0].list"
            :key="index"
            @load="imgLoad"
            alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailGoodsInfo",
    props: {
        detailInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            counter:0,
            imgLength:0
        };
    },
    methods: {
        imgLoad(){
            //判断是否为最后一张,获取到数组图片长度，对比counter。
            this.counter ++
            if(this.counter === this.imgLength){
                this.$emit("imgLoad")
            }
        }
    },
    watch:{
        detailInfo(){
            this.imgLength = this.detailInfo.detailImage[0].list.length;
        }
    }
}

</script>
<style  scoped>
.goods-info{
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
}
.info-desc .desc{
    padding: 15px;
    font-size: 14px;
}
.info-desc .start,.info-desc .end{
    width: 90px;
    position: relative;
    height: 1px;
    background-color: #a3a3a5;
}
.info-desc .start::before{
    content: "";
    width: 5px;
    height: 5px;
    position: absolute;
    top:-5px;
    left: 0;
    background-color: #000;
}
.info-desc .end::before{
    content: "";
    width: 5px;
    height: 5px;
    position: absolute;
    top:-5px;
    right: 0;
    background-color: #000;
}
.info-key{
    margin:10px 0 10px 15px;
    font-size: 15px;
    color: #333;
}
.info-list img{
    width: 100%;
}
</style>