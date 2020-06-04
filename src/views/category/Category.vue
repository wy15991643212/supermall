<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <side-bar class="side-bar" :categories="categories" @selectItem="selectItem" />
      <scroll class="tab-content" ref="scroll">
        <div>
          <tab-content-category :subcategories="showCategories" />
          <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" />
          <tab-content-detail :category-detail="showcCategoryDetail" />
          <div style="heigh:1000px;"></div>
        </div>
      </scroll>

    </div>
  </div>
</template>

<script>

import NavBar from "@/components/common/navbar/NavBar"
import Scroll from "@/components/common/scroll/Scroll"
import TabControl from "@/components/content/tabcontrol/TabControl"
import { getCategory, getSubcategory, getCategoryDetail } from "@/network/category"

import SideBar from "./childComps/SideBar"
import TabContentCategory from "./childComps/TabContentCategory"
import TabContentDetail from "./childComps/TabContentDetail"
export default {
  name: "Category",
  data() {
    return {
      currentIndex: -1,
      categories: [],
      categoryData: {
      },
      currentType: "pop"
    };
  },
  components: {
    NavBar,
    SideBar,
    Scroll,
    TabContentCategory,
    TabControl,
    TabContentDetail
  },
  created() {
    //请求分类数据
    this._getCategory()

  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        // console.log(res)
        // 1.获取分类数据
        this.categories = res.data.category.list
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0)
      })
    },
    _getSubcategories(index) {
      //获取到当前点击的 index
      this.currentIndex = index;
      //得到当前点击的maitKey
      const mailKey = this.categories[index].maitKey;
      //发送请求
      getSubcategory(mailKey).then(res => {
        // console.log(res)
        this.categoryData[index].subcategories = res.data
        this.categoryData = { ...this.categoryData }
        //
        this._getCategoryDetail("pop")
        this._getCategoryDetail("sell")
        this._getCategoryDetail("new")
      })
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = { ...this.categoryData }
        this.currentType = type
      })
    },
    /**
     * 事件响应相关的方法
    */
    selectItem(index) {
      this._getSubcategories(index)
      this.$refs.scroll.refresh()
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
    }
  },
  computed: {
    showCategories() {
      if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showcCategoryDetail() {
      if (this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  }
}

</script>
<style  scoped>
.nav-bar {
  height: 44px;
  line-height: 44px;
  background-color: var(--color-tint);
  font-weight: 700;
  text-align: center;
  color: #FFF;
  top: 0;
  left: 0;
  right: 0;
}

.content {
  display: flex;
}

.side-bar {
  width: 100px;
  height: 100%;
  background-color: #f6f6f6;
}

.tab-content {
  flex: 1;
  height: calc(100vh - 44px - 49px);
  overflow: hidden;
}
</style>