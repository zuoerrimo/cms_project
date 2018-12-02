<template>
  <div>
    <mt-header title="信息管理系统"></mt-header>
    <router-view class="tmpl"></router-view>
    <mt-tabbar v-model="selected">
      <mt-tab-item id="home">
      <img slot="icon" src="./assets/img/index.png" @click="changeHash">
        首页
      </mt-tab-item>
      <mt-tab-item id="member">
        <img slot="icon" src="./assets/img/vip.png" @click="changeHash">
        会员
      </mt-tab-item>
      <mt-tab-item id="shopcar">
        <img slot="icon" src="./assets/img/shopcar.png" @click="changeHash">
        购物车
      </mt-tab-item>
      <mt-tab-item id="search">
        <img slot="icon" src="./assets/img/search.png" @click="changeHash">
        查找
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
       selected: ''
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .mint-tabbar {
  position: fixed;
  bottom: 0px;
 }
</style>
