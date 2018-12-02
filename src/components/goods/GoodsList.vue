<template>
<div>
  <nav-bar title="商品展示列表"></nav-bar>
  <div class="demo">
   <mt-loadmore 
      :auto-fill="false" 
      :bottom-method="loadBottom"  
      :bottomAllLoaded="isAllLoaded" 
      ref="loadMore">
     <ul>
      <li v-for="goods in goodsList" :key="goods.id">
       <router-link :to="{name: 'goods.detail', params: {id: goods.id}}">
        <img :src="goods.img_url"/>
        <div>
          {{goods.title |　convertStr(25)}}
        </div>
        <div class="desc">
          <div class="sell">
            <span>${{goods.sell_price}}</span>
            <s>${{goods.market_price}}</s>
          </div>
          <div clas="detail">
            <div class="hot">热卖中</div>
            <div class="count">剩余{{goods.stock_quantity}}件</div>
          </div>
        </div>
        </router-link>
      </li>
    </ul> 
  </mt-loadmore>
</div>
</div>

</template>
<script>
  export default {
    name: 'goodsList',
    data() {
      return {
        goodsList: [],
        page: 1,
        isAllLoaded: false, //全部数据是否加载完毕
      }
    },
    methods: {
      firstLoadByPage() {
        this.$axios.get(`getgoods?pageindex=${this.page}`)
        .then(res => {
          this.goodsList = res.data.message
          this.page++
        })
        .catch(err => {
          console.log('获取商品展示列表失败', err)
        })
      },
      concatByPage() {
        this.$axios.get(`getgoods?pageindex=${this.page}`)
        .then(res => {
          if (res.data.message.length === 0) {
            this.$toast('没有更多数据啦！！')
            // loadmore禁止函数调用属性
            this.isAllLoaded = true
          }
          this.goodsList = this.goodsList.concat(res.data.message)
            this.page++;
            this.$refs.loadMore.onBottomLoaded() // 通知元素重新定位
        })
        .catch(err => {
          console.log('获取商品展示列表失败', err)
        })

      },
      loadBottom() {
        this.concatByPage()
      },
    },
    created() {
      this.page = this.$route.query.id || 1
      this.firstLoadByPage()
    }
  }
</script>
<style scoped>
  
</style> 