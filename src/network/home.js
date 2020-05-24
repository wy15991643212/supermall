import {request} from "./request"
// 这里是只针对home的请求
export function getHomeMultidata(){
    return request({
        url:"home/multidata"
    })
}
//请求home里的商品数据
export function getHomeGoods(type,page){
    return request({
        url:"home/data",
        params:{
            type,
            page
        }
    })
}