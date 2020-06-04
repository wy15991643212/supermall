<template>
  <div class="category-list">
    <div class="category-item" 
      v-for="(item,index) in subcategories.list"
      :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
        <div class="title">{{item.title}}</div>
    </div>  
  </div>
</template>

<script>
export default {
name:"TabContentCategory" ,
props:{
  subcategories:{
    type:Object,
    defualt(){
      return {}
    }
  }
},
  data () {
    return {
    };
  },
  components: {},

  methods: {}
}

</script>
<style  scoped>
.category-list{
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, 70px);
    grid-gap: 10px;
}
.category-list:after {
    content: "";
    flex: auto;
 }
.category-item{
  width:70px;
  font-size: 14px;
  margin:10px 5px;
  text-align: center;
}
.category-item img{
  width: 80%;
}
.category-item .title{
  font-size: 14px;
  line-height: 16px;
  margin-top: 15px;
}
</style>