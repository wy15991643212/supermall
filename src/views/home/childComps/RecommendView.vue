<template>
    <div class="recommend">
        <div class="recommend-item" v-for="(item,index) in recommends" :key="index">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "RecommendView",
    props: {
        recommends: {
            type: Array,
            default(){
                return []
            }
        }
    },
    data() {
        return {
        };
    }
}

</script>
<style  scoped>
.recommend{
    display: flex;
    width: 100%;
    font-size: 12px;
    text-align: center;
    border-bottom:5px solid #eee;
}
.recommend-item{
    flex:1;
    padding: 10px 0 20px;
}
.recommend img{
    width: 60px;
    height: 60px;
    margin-bottom: 5px;
   
}
</style>