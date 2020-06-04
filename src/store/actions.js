import {
    ADD_COUNT,
    ADD_TO_CAR
} from "./mutation-types"
export default {
    addCarList(context, payload) {
        // 把之前的代码，放到promise里面。在外面可以知道，添加购物车的操作完成了没有
        // 再去给用户显示，添加购物车完成的 toast 提示
        return new Promise((resolve,reject) => {
            //这里传入购物车里的信息(payload)，做判断
            //1. 先判断数组里有没有当前商品的 iid，有的话让它的数量+1，没有的话就直接push到carList[]里
            // 判断数组里item的iid  是否和 传入的商品iid相等
            let product = context.state.carList.find(item => item.iid === payload.iid)
            //2. product 为 ture 表示相等
            if (product) {
                // product.count += 1  这里放到mutations 里
                // 提交到mutations 里操作
                context.commit(ADD_COUNT, product)
                resolve("商品数量+1")
            } else {
                //不相等的话，给item设置个count 为1，再把新商品加入到里面
                payload.count = 1
                //提交到mutations 里操作
                context.commit(ADD_TO_CAR, payload)
                resolve("已加入购物车")

            }
        })
    }
}