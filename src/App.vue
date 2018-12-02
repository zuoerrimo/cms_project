<template>
  <div>
    <mt-header title="信息管理系统"></mt-header>
    <transition name="rv" mode="out-in">
      <router-view class="tmpl"></router-view>
    </transition>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="home">
      <img slot="icon" src="./assets/img/index.png" @click="changeHash">
        首页
      </mt-tab-item>
      <mt-tab-item id="member">
        <img slot="icon" src="./assets/img/vip.png" @click="changeHash">
        会员
      </mt-tab-item>
      <mt-tab-item id="shopcart">
        <img slot="icon" src="./assets/img/shopcar.png" @click="changeHash">
        购物车
        <mt-badge type="error">
          {{num}}
        </mt-badge>
      </mt-tab-item>
      <mt-tab-item id="search">
        <img slot="icon" src="./assets/img/search.png" @click="changeHash">
        查找
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import EventBus from './EventBus.js'
import GoodsTools from './GoodsTools.js'
export default {
  name: 'App',
  data () {
    return {
       selected: '',
       num: 0,
    }
  },
  methods: {
    changeHash() {
      this.$nextTick(() =>{
        this.$router.push({
          name: this.selected
        })
      })
    },
  },
  watch: {
  },
  created() {
    // 初始化商品数量
    this.num = GoodsTools.getTotalCount()
    EventBus.$on('addShopCart', (data) =>{
      this.num += data
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .mint-tabbar {
  position: fixed;
  bottom: 0px;
 }
.rv-enter-active, .rv-leave-active {
  transition: opacity .5s;
}
.rv-enter, .rv-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
