<template>
  <div>
    <!--上有轮播图 下有九宫格 -->
    <my-swipe url="getlunbo">
    </my-swipe>
    <div class="grid">
      <my-ul>
        <my-li v-for="(grid, index) in grids" :key="index">
          <router-link :to="grid.router">
            <span :class="grid.className"></span>
            <span>
              {{grid.title}}
            </span>
          </router-link>
        </my-li>
      </my-ul>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'home',
    data() {
      return {
        imgs: [],
        grids: [{
          className: 'cms-news',
          title: '新闻资讯',
          router: {
            name: 'news.list'
          }
        }, {
          className: 'cms-photo',
          title: '图文分享',
          router: {
            name: 'photo.list',
            params: {
              categoryId: 0
            }
          }
        }, {
          className: 'cms-photo',
          title: '商品展示',
          router: {
            name: 'goods.list',
            query: {id:1},
          }
        }, {
          className: 'cms-photo',
          title: '留言反馈',
          router: {
            name: 'news.list'
          }
        }, {
          className: 'cms-photo',
          title: '搜索资讯',
          router: {
            name: 'news.list'
          }
        }, {
          className: 'cms-photo',
          title: '联系我们',
          router: {
            name: 'news.list'
          }
        }]
      }
    },
    // 创建组件生命周期时，可以操作数据
    created() {
    },
  }
</script>
<style scoped>
  .mint-swipe {
    height: 200px;
  }
  img {
    width: 100%;
  }
  /*九宫格图片*/
  .cms-news {
    background-image: url('../assets/img/search.png');
    height: 50px;
    background-repeat: round;
    width: 50px;
    display: inline-block;
  }
  .cms-photo {
    background-image: url('../assets/img/search.png');
    height: 50px;
    background-repeat: round;
    width: 50px;
    display: inline-block;
  }
</style>