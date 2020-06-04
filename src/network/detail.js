import {request} from "@/network/request"
export function getDetail(iid){
    return request({
        url:"detail",
        params:{
            iid
        }
    })
}
//请求推荐信息
export function getRecommend(){
    return request({
        url:"/recommend",
    })
}
//创建一个goods的类
export class Goods{
    constructor(itemInfo,columns,services){
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.realPrice = itemInfo.lowNowPrice
        this.highPrice = itemInfo.highPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns 
        this.services = services
    }
}
//创建一个shop的类
export class Shop{
    constructor(shopInfo){
        this.logo = shopInfo.shopLogo
        this.name = shopInfo.name
        this.fans = shopInfo.cFans
        this.sells = shopInfo.cSells
        this.score = shopInfo.score
        this.goodsCount = shopInfo.cGoods
    }
}
//proamInfo 类
export class paramInfo{
    constructor(info,rule){
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set
        this.sizes = rule.tables
    }
}