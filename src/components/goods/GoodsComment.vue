<template>
  <div>
    <nav-bar title="商品评论"/>
    <comment :cid="$route.query.id"></comment>
  </div>
</template>
<script>
  export default {
    data() {
      return {

      }
    },
  }
</script>