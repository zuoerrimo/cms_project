import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Member from '@/components/Member'
import Search from '@/components/Search'
import NewList from '@/components/News/NewsList'
import NewsDetail from '@/components/News/NewsDetail'
import PhotoList from '@/components/photo/PhotoList'
import PhotoDetail from '@/components/photo/PhotoDetail'
import GoodsList from '@/components/goods/GoodsList'
import GoodsDetail from '@/components/goods/GoodsDetail'
import GoodsComment from '@/components/goods/GoodsComment'
import ShopCart from '@/components/ShopCart/ShopCart'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: {
        name: 'home'
      }
    }, {
      path: '/home',
      name: 'home',
      component: Home,
    }, {
      path: '/member',
      name: 'member',
      component: Member
    }, {
      path: '/search',
      name: 'search',
      component: Search
    }, {
      // 新闻列表
      path: '/news/list',
      name: 'news.list',
      component: NewList
    }, {
      // 新闻详情
      path: '/news/detail',
      name: 'news.detail',
      component: NewsDetail,
    }, {
      // 图文分享
      path: '/photo/list/:categoryId',
      name: 'photo.list',
      component: PhotoList,
    }, {
      path: '/photo/detail',
      name: 'photo.detail',
      component: PhotoDetail,
    }, {
      path: '/goods/list',
      name: 'goods.list',
      component: GoodsList,
    }, {
      path: '/goods/detail/:id',
      name: 'goods.detail',
      component: GoodsDetail,
    }, {
      // 商品图文介绍
      path: '/goods/photo/info',
      name: 'photo.info',
      component: NewsDetail,
    }, {
      path: '/goods/comment',
      name: 'goods.comment',
      component: GoodsComment,
    }, {
      path: '/shopcart',
      name: 'shopcart',
      component: ShopCart,
    }
  ]
})
