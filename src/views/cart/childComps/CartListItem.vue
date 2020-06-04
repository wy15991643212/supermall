<template>
    <div class="cart-item">
        <div class="item-selector">
            <check-button @click.native="checkClick" :isCheck="product.checked"/>
        </div>
        <div class="itme-img">
            <img :src="product.image" alt="">
        </div>
        <div class="cart-info">
            <div class="info-title">{{product.title}}</div>
            <div class="info-desc">商品描述：{{product.desc}}</div>
            <div class="info-bottom">
                <div class="info-price left">￥{{product.price}}</div>
                <div class="info-count right">x{{product.count}}</div>
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
         checkClick(){
          this.product.checked = !this.product.checked;
      }
    }
}

</script>
<style  scoped>
.cart-item{
    display: flex;
    width: 100%;
    padding: 5px;
    border-bottom:1px solid #ccc;
}
.item-selector {
    width: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.itme-img{
    padding: 5px;
}
.itme-img img{
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
}
.cart-info{
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
}
.info-title,.info-desc{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.info-desc{
    font-size: 14px;
    color: #666;
    margin-top: 15px;
}
.info-bottom{
    margin-top: 30px;
    position: relative;
}
.info-price{
    color:orangered;
}
</style>