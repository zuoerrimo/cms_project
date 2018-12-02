<template>
  <li>
    <slot></slot>
  </li>
</template>
<script>
  export default {
    name: 'my-li',
    data() {
      return {
      }
    },
  }
</script>
<style scoped>
 li{
      list-style: none;
      width: 33.3%;
      float: left;
      background-color: greenyellow;
      text-align: center;
      height: 100px;
      line-height: 100px;
  }
</style>