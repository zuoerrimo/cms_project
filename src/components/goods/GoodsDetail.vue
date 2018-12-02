<template>
<div>
  <nav-bar title="商品详情"></nav-bar>
  <div class="outer-siwper">
    <div class="swiper">
      <my-swipe url="getthumimages/87">
      </my-swipe>
    </div>
  </div>
  <div class="product-desc">
    <ul>
      <li>
        <span class="product-desc-span">
          {{goodsDetail.title}}
        </span>
      </li>
      <li class="price-li">
        市场价：<s>{{goodsDetail.market_price}}</s>
        销售价：<span>{{goodsDetail.sell_price}}</span>
      </li>
      <li class="number-li">
        购买数量：
        <span>-</span>
        <span>1</span>
        <span>+</span>
      </li>
      <li>
        <mt-button type="primary">
          立即购买
        </mt-button>
        <mt-button type="danger"
          @click="insertBall"
        >
          加入购物车
        </mt-button>
      </li>
    </ul>
  </div>
   <transition name="ball"
     v-on:after-enter="afterEnter"
   >
    <div class="ball" v-if="isExist">
      ddd
    </div>
  </transition>

  <div>
    <p>
      商品参数
    </p>
    <p>
      商品编号: {{goodsDetail.goods_no}}
    </p>
    <p>
      库存情况： {{goodsDetail.stock_quantity}}
    </p>
    <p>
      上架时间：{{goodsDetail.add_time | convertTime('YYYY-MM-DD')}}
    </p>
  </div>
</div>

</template>
<script>
  export default {
    name: 'goodsDetail',
    data() {
      return {
        goodsDetail: {},
        isExist: false,
      }
    },
    methods: {
      afterEnter() {
        // 移除元素
        this.isExist = false;
      },
      insertBall() {
        this.isExist = true;
      },
    },
    created() {
      this.$axios.get('goods/getinfo/' + this.$route.params.id)
      .then(res => {
         this.goodsDetail = res.data.message[0]
      })
      .catch(err => {
        console.log('获取商品详情失败', err)
      })
    }
  }
</script>
<style scoped>
  .ball-enter-active {
    animation: bounce-in 1s;
  }
   /* 元素离开后，透明度0*/
   .ball-leave {
    opacity: 0;
  }
</style>