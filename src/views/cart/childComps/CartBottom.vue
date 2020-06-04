<template>
    <div class="cart-bottom">
        <div class="check-all" @click="clickAll">
            <checked-button :is-check="isCheck" class="check-button" />
            <span>全选</span>
        </div>
        <div class="total">合计：￥{{totalPrice}}</div>
        <div class="calculate">去计算：({{checkLength}})</div>
    </div>
</template>

<script>
import CheckedButton from "./CheckedButton"
export default {
    name: "CartBottom",
    data() {
        return {
        };
    },

    components: {
        CheckedButton
    },
    computed: {
        totalPrice() {
            const carList = this.$store.getters.carList;
            return carList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + item.count * item.price
            }, 0).toFixed(2)
            // return this.$store.getters.carList.filter( item =>{
            //     return item.checked
            // }).reduce((proValue,item) =>{
            //     return proValue + item.count * item.price
            // },0).toFixed(2)
        },
        checkLength() {
            //拿到getters 里的carList
            const carList = this.$store.getters.carList;
            //过滤，出当前选中的
            return carList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                //reduce((处理完回调的值（第一次为默认值），对象)=>{},默认值)
                return preValue + item.count
            }, 0)
        },
        isCheck(){
            //判断底下全选按钮的状态
            // 如果数组是空，则返回false
            if(this.$store.getters.carList == 0) return false 
            //1. 如果有一个按钮未选中，则全选按钮就是不选中状态  
            //some() 有一个满足条件的，返回true 后面的不再执行
            return !(this.$store.getters.carList.some( item => !item.checked))
        }
    },
    methods:{
        clickAll(){
            // 判断是否有未选中按钮
            let ischeck = (this.$store.getters.carList.some( item => !item.checked))
            //有未选中按钮，则全部选中 
            if(ischeck){
                this.$store.getters.carList.forEach( item => {
                    item.checked = true
                })
            }else{
                this.$store.getters.carList.forEach( item => {
                    item.checked = false
                })
            }
        }
    }
}

</script>
<style  scoped>
.cart-bottom {
    width: 100%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
    height: 40px;
    background-color: #fff;
    display: flex;
    align-items: center;
    /*justify-content: center;*/
}

.check-all {
    display: flex;
    margin-left: 10px;
    width: 75px;
}

.cart-bottom .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
}

.total {
    flex: 1;
    line-height: 40px;
}

.calculate {
    width: 100px;
    background-color: #f40;
    line-height: 40px;
    color: #FFF;
    text-align: center;
}
</style>