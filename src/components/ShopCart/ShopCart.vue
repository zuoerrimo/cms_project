<template>
  <div>
    <nav-bar title="购物车"></nav-bar>
    <div pay-detail>
      <ul>
        <li v-for="(goods, index) in shopcart" :key="goods.is">
          <mt-switch v-model="goods.isSelected"></mt-switch>
          <img :src="goods.thumb_path"/>
          <div class="pay-calc">
            <p>商品标题</p>
            <div class="calc">
              <span>${{goods.sell_price}}</span>
              <span @click="sub(goods)">-</span>
              <span>{{goods.num}}</span>
              <span @click="add(goods)">+</span>
              <a href="javascript:;"
                @click="del(index)"
              >删除</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="show-price">
      <div class="show-1">
        <ul>
          <li>
            总计（不包含运费）：
          </li>
          <li>
            <span>已选商品{{payment.count}}件</span>
            <span>总价 ￥{{payment.price}}</span>
            <mt-button type="danger" size="large">去结算</mt-button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import GoodsTools from '@/GoodsTools'
  export default {
    name: 'shopcart',
    data() {
      return {
        shopcart: [],
      }
    },
    computed: {
      payment() {
        let price = 0
        let count = 0
        this.shopcart.forEach(goods => {
          if (goods.isSelected) {
            count += goods.num
            price += goods.num * goods.sell_price
          }
        })
        return {
          count,
          price
        }
      },
    },
    beforeRouteLeave (to, from , next) {
      if (confirm('确定要离开?')) {
        // 保存购物车数据
        let obj = {}
        this.shopcart.forEach(goods => {
          obj[goods.id] = goods.num
        })
        GoodsTools.saveGoodsList(obj)
        next()
      } else {
        next(false) // 取消导航行为
      }
    },
    methods: {
      add(goods) {
        goods.num ++;
      },
      sub(goods) {
        goods.num --;
      },
      del(index) {
        this.shopcart.splice(index, 1)
        this.$toast('删除成功')
      },
    },
    created() {
      let goodsList = GoodsTools.getGoodsList()
      let ids = Object.keys(goodsList).join(',')
      this.$axios.get('goods/getshopcarlist/' + ids)
      .then(res => {
        this.shopcart = res.data.message
        this.shopcart.forEach(goods => {
          if (goodsList[goods.id]) {
            // 手动通知vue，添加属性
            this.$set(goods, 'num', goodsList[goods.id])
          }
          this.$set(goods, 'isSelected', true)
        })
      })
      .catch(err => {
        console.log('获取购物车信息失败',err)
      })
    },
  }
</script>