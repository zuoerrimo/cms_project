<template>
  <div>
  <nav-bar title="商品展示"></nav-bar>
  <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" @top-status-change="handleTopChange" ref="loadMore">
    <ul>
      <li v-for="item in list">{{ item }}</li>
    </ul>
    <div slot="top" class="mint-loadmore-top">
      <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
      <span v-show="topStatus === 'loading'">Loading...</span>
    </div>
  </mt-loadmore>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        list: [1,2,3,4,5,6],
        topStatus: '',
      };
    },
    methods: {
      loadBottom() {
        console.log('上拉函数调用被触发了')
        //this.$refs.loadMore.onBottomLoaded()
      },
      handleTopChange(status) {
        console.log(status)
        this.topStatus = status;
      },
      loadTop() {
        console.log('函数调用被触发了')
        this.$refs.loadMore.onTopLoaded()
      },
    },
  };
</script>