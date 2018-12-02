<template>
<div>
  <nav-bar title="图文列表"></nav-bar>
  <div class="photo-header">
    <ul>
      <li v-for="c in categorys" :key="c.id">
        <a href="#" @click="loadImgsByCategoryId(c.id)">
          {{c.title}}
        </a>
      </li>>
    </ul>
  </div>
  <div class="demo">
  <ul>
      <li v-for="photo in photoList" :key="photo.id">
        <router-link :to="{name: 'photo.detail', query: {id:photo.id}}">
          <img v-lazy="photo.img_url">
          <p>
            <span>{{photo.title}}</span>
            <br/>
            <span>{{photo.zhaiyao}}</span>
          </p>
        </router-link>
      </li>
  </ul> 
  
</div>
</div>

</template>
<script>
  export default {
    name: 'photoList',
    data() {
      return {
        photoList: [],
        categorys: [],
      }
    },
    beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    // 路由复用，但参数触发改变，参数指params、query
    this.loadImgById(to.params.categoryId);
    next()
  },
  methods: {
    loadImgById(categoryId) {
        this.$axios.get('getimages/' + categoryId)
          .then(res => {
           this.photoList = res.data.message
           if(this.photoList.length == 0) {
            this.$toast(
             '没有数据',
             );
          }
        })
        .catch(err => {
          console.log('获取图文分享失败', err)
        })
      },
      loadImgsByCategoryId(categoryId) {
        this.$nextTick(() =>{
          this.$router.push({
            name: 'photo.list',
            params: {
              categoryId,
            }
          })
        })
      },
    },
    created() {
      let categoryId = this.$route.params.categoryId
      this.loadImgById(categoryId)
      this.$axios.get('getimgcategory')
        .then(res => {
         this.categorys = res.data.message
         this.categorys.unshift({
          id: 0,
          title: '全部',
         })
       })
        .catch(err => {
          console.log('分类信息获取失败', err)
        })
    }
  }
</script>
<style scoped>
// 图片加载
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>