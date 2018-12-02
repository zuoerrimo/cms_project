<template>
  <div class="cms-s-header">
    <h1 @click="goBack">&nbsp<</h1>
    <h1>{{title}}</h1>
  </div>
</template>
<script>
  export default {
    name: 'NavBar',
    props: ['title'],
    data() {
      return {
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      }
    }
  }
</script>
