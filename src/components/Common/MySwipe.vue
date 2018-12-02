<template>
<div>
  <mt-swipe :auto="4000">
    <mt-swipe-item v-for="(img, index) in imgs" :key="index">
      <img :src="img.img || img.src"/>
    </mt-swipe-item>
  </mt-swipe> 
</div>

</template>
<script>
  export default {
    name: 'MySwipe',
    props: ['url'],
    data() {
      return {
        imgs: [],
      }
    },
    created() {
     this.$axios.get(this.url)
      .then(res => {
        this.imgs = res.data.message
      })
      .catch(err => {
        console.log('轮播图获取异常', err)
      })
    },
  }
</script>
<style scoped>
  .mint-swipe {
    height: 200px;
  }
  img {
    width: 100%;
    height: 200px;
  }
</style>