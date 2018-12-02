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
        <span @click="sub">-</span>
        <span>{{pickNum}}</span>
        <span @click="add">+</span>
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
      小球
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
  <div>
    <ul>
      <li>
        <mt-button type="primary" plain
        size="large"
        @click="showPhotoInfo"
        >
          图文介绍
        </mt-button>
      </li>
      <li>
        <mt-button type="danger" plain
        size="large"
        @click="goodsComment"
        >
          商品评论
        </mt-button>
      </li>
    </ul>
  </div>
</div>

</template>
<script>
 import EventBus from '@/EventBus.js'
 import GoodsTools from '@/GoodsTools'
  export default {
    name: 'goodsDetail',
    data() {
      return {
        goodsDetail: {},
        isExist: false,
        pickNum: 1, //加入购物车数量
      }
    },
    methods: {
      // 显示商品评论
      goodsComment() {
        this.$router.push({
          name: 'goods.comment',
          query: {
            id: this.$route.params.id,
          },
        })
      },
      // 图文介绍
      showPhotoInfo() {
        this.$router.push({
          name: 'photo.info',
          query: {
            id: this.$route.params.id,
          },
        })
      },
      add() {
        if (this.goodsDetail.stock_quantity <= this.pickNum) {
          return
        }
        this.pickNum++;
      },
      sub() {
        if (this.pickNum <=1) {
          return
        }
        this.pickNum--;
      },
      afterEnter() {
        // 移除元素
        this.isExist = false;
        // 通知App增加数量
       //  EventBus.$emit('addShopCart', this.pickNum)
        // 添加到本地存储
        GoodsTools.add({
          id: this.goodsDetail.id,
          num: this.pickNum,
        })
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
  @keyframes bounce-ind {
    0% {
      transform: translate3d(0,0,0)
    }
    50% {
      transform: translate3d(140px,-50px,0)
    }
    75% {
      transform: translate3d(160px,0px,0)
    }
    100% {
      transform: translate3d(140px,300px,0)
    }
  }
</style>