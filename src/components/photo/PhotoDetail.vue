<template>
<div>
  <nav-bar title="图文详情"></nav-bar>
  <div class="photo-header">
    <p>
      {{photoDetail.title}}
    </p>
    <div>
      <span>{{photoDetail.click}}次点击</span>
      <span>分类：经济</span>
      <span>发起日期：{{photoDetail.add_time | convertTime('YYYY-MM-DD')}}</span>
    </div>
     <vue-preview  class="preview" :slides="imgs"></vue-preview>
    <div>
      <p v-html="photoDetail.content"></p>
    </div>
  </div>
  <!--评论组件 -->
  <comment
    :cid="$route.query.id"
  ></comment>
</div>

</template>
<script>
  export default {
    name: 'photoDetail',
    data() {
      return {
        photoDetail: [],
        imgs: [],
      }
    },
    methods: {
    },
    created() {
      let id = this.$route.query.id
      this.$axios.get('getimageinfo/' +id)
        .then(res => {
         this.photoDetail = res.data.message[0]
       })
        .catch(err => {
          console.log('获取图文详情失败', err)
        })
        // 获取缩略图
      this.$axios.get('getthumimages/' +id)
        .then(res => {
         this.imgs = res.data.message
         this.imgs.forEach(img => {
          img.msrc = img.src
          img.w = 600
          img.h = 400
         })
       })
        .catch(err => {
          console.log('获取缩略图失败', err)
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