import {debounce} from "./untils"

export const imgListenerMixin = {
    data(){
        return {
            itemImgListener:null
        }
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 200)
        this.itemImgListener = () => {
            refresh()
        }
        this.$bus.$on("itemImgLoad", this.itemImgListener)
        // console.log("mixin")
    }
}

