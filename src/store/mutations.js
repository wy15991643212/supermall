import {
    ADD_COUNT,
    ADD_TO_CAR,
    SUBTRACT_COUNT,
    DELETE_GOOD
} from "./mutation-types"
export default {
    //mutatiaons mutation 必须是同步函数     mutatiaon可以状态跟踪
    //mutations 唯一的目的就是修改state中的状态
    //mutations 中的每个方法尽可能完成的事情比较单一一点，所以这里的事件放到action中

    //相同  数量加1  
    [ADD_COUNT](state, payload) {
        payload.count += 1
    },
    //当前商品iid 和carList[] 里的item 的iid 不同，加入购物车
    [ADD_TO_CAR](state, payload) {
        // 给商品添加 checked属性，用于记录是否选中(默认选中)
        payload.checked = true
        state.carList.push(payload)
    },
    [SUBTRACT_COUNT](state, payload) {
        if(payload.count > 1){
            payload.count -= 1
        }else{
            payload.count = 1
        }
    },
    [DELETE_GOOD](state, payload) {
        state.carList.splice(payload,1)
    }
   
}