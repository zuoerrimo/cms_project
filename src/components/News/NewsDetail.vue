<template>
<div>
  <nav-bar :title="title"></nav-bar>
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
        title: '',// 变化的标题
      }
    },
    // 路由确认前，组件渲染前
    beforeRouteEnter (to, from, next) {
    // 1、判断from from为空时，说明是改地址栏，根据to来判断title
    // 2、from 为 news.detail,title 新闻详情
    // 3、from 为 photo.info,title 商品图文详情

    let title = ""
    if (from.name === null) {
      title = to.name === 'news.detail' ? '新闻详情' :'商品图文介绍'
    } else if (from.name === 'news.list') {
      title = '新闻详情'
    } else if(from.name === 'goods.detail') {
      title = '商品图文介绍'
    }
      next(vm => {
    // 通过 `vm` 访问组件实例
    vm.title = title // vm 是未来组件对象的this
    })
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