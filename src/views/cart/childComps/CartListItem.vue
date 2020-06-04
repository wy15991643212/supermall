<template>
    <div class="cart-item">
        <div class="item-selector">
            <check-button @click.native="checkClick" :isCheck="product.checked" />
        </div>
        <div class="itme-img">
            <img :src="product.image" alt="">
        </div>
        <div class="cart-info">
            <div class="info-title">{{product.title}}</div>
            <div class="info-desc">商品描述：{{product.desc}}</div>
            <div class="info-bottom">
                <div class="info-price left">￥{{product.price}}</div>
                <div class="info-count right">
                    <button class="subtract" @click="subtract">-</button>
                    <span>{{product.count}}</span>
                    <button class="add-count" @click="addCount">+</button>
                </div>
                <button class="delete" @click="deleteGood(index)">删除</button>

            </div>
        </div>
    </div>
</template>

<script>
import CheckButton from "./CheckedButton"
export default {
    name: "CartListItem",
    props: {
        product: {
            type: Object,
            fefault() {
                return {}
            }
        },
        index:{
            type:Number,
            default:null
        }
    },
    data() {
        return {
        };
    },

    components: {
        CheckButton
    },

    methods: {
        checkClick() {
            this.product.checked = !this.product.checked;
        },
        addCount() {
            this.$store.commit("ADD_COUNT",this.product)
        },
        subtract() {
            this.$store.commit("SUBTRACT_COUNT",this.product)
        },
        deleteGood(){
            //在父组件拿到 当前商品的下标，传到mutations
            // console.log(this.product)
            // console.log(this.product.iid)
            console.log()
            this.$store.commit("DELETE_GOOD",this.index)
        }
    }
}

</script>
<style  scoped>
.cart-item {
    display: flex;
    width: 100%;
    padding: 5px;
    border-bottom: 1px solid #ccc;
}

.item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.itme-img {
    padding: 5px;
}

.itme-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
}

.cart-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
}

.info-title,
.info-desc {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.info-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
}

.info-bottom {
    margin-top: 30px;
    position: relative;
}

.info-price {
    color: orangered;
}
.info-bottom .right span{
    display: inline-block;
    width: 30px;
    text-align: center;
}
.info-bottom .right{
    border: 1px solid #ccc; 
    margin-right: 50px;
}
.info-bottom .right button{
    display: inline-block;
    border: none;
    width: 20px;
    background-color: #fff;
    font-size: 22px;
}
.info-bottom .right .subtract{
    border-right:1px solid #ccc; 
}
.info-bottom .right .add-count{
     border-left:1px solid #ccc; 
}
.info-bottom .delete{
    position: absolute;
    right: 0;
    top:0;
    background-color: #F40;
    font-size: 18px;
    border: none;
    color: #FFF;
    padding: 3px 2px;
}
</style>