<template>
<div>
  <nav-bar title="新闻列表"></nav-bar>
  <div class="demo">
  <ul>
      <li v-for="news in newsList" :key="news.id">
       <router-link :to="{name: 'news.detail', query: {id: news.id}}">
        <img :src="news.img_url"/>
        <div>
          <span>{{news.title}}</span>
          <div class="news-desc">
            <p>点击数：{{news.click}}</p>
            <p>发表时间：{{news.add_time | convertTime('YYYY-MM-DD')}}</p>
          </div>
        </div>
        </router-link>
      </li>
  </ul> 
  
</div>
</div>

</template>
<script>
  export default {
    name: 'newsList',
    data() {
      return {
        newsList: [],
      }
    },
    created() {
      this.$axios.get('getnewslist')
      .then(res => {
        this.newsList = res.data.message
      })
      .catch(err => {
        console.log('获取新闻列表失败', err)
      })
    }
  }
</script>
<style scoped>
  
</style>