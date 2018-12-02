<template>
<div>
  <nav-bar title="新闻详情"></nav-bar>
  <div>
    <p>{{newsDetail.title}}</p>
    <div>
      <span>{{newsDetail.click}}次点击</span>
      <span>分类：经济</span>
      <span>添加时间：{{newsDetail.add_time | convertTime('YYYY-MM-DD')}}</span>
    </div>
    <div class="news-content" v-html="newsDetail.content"></div>
  </div>
</div>

</template>
<script>
  export default {
    name: 'newsDetail',
    data() {
      return {
        newsDetail: {},
      }
    },
    created() {
      let id = this.$route.query.id
      this.$axios.get('getnew/' + id)
      .then(res => {
         this.newsDetail = res.data.message[0]
      })
      .catch(err => {
        console.log('获取新闻详情失败', err)
      })
    }
  }
</script>
<style scoped>

</style>