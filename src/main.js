// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import Axios from 'axios'
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = 'http://www.sinya.online/api/'
// 配置请求拦截器，显示loading图标
Axios.interceptors.request.use(function(config) {
  MintUI.Indicator.open({
    text: '拼命加载中',
    spinnerType: 'fading-circle'
  });
  return config
})
// 配置相应拦截器，关闭loading
Axios.interceptors.response.use(function(response) {
  MintUI.Indicator.close();
  return response
})


import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/global.css'
Vue.use(MintUI)

// 引入图标的css
// import './assets/css/'
// 引入custom组件
// 
// 全局组件
import MYUl from '@/components/Common/MyUl.vue'
import MYLi from '@/components/Common/MyLi.vue'
import NavBar from '@/components/Common/NavBar.vue'
import Comment from '@/components/Common/Comment'
import MySwipe from '@/components/Common/MySwipe'
Vue.component(MYUl.name, MYUl)
Vue.component(MYLi.name, MYLi)
Vue.component(NavBar.name, NavBar)
Vue.component(Comment.name, Comment)
Vue.component(MySwipe.name, MySwipe)

Vue.config.productionTip = false

// 定义moment全局日期过滤器
import Moment from 'moment'
Moment.locale('zh-cn')
Vue.filter('convertTime', function(data, formatStr) {
  return Moment(data).format(formatStr)
})

Vue.filter('relativeTime', function(preTime) {
  return Moment(preTime).fromNow()
})

// 处理字字符串过程
Vue.filter('convertStr', function(str, count) {
  return str.substring(0, count) + '...'
})

import VuePreview from 'vue-preview'
 
// defalut install 缩略图
Vue.use(VuePreview) // 内部会运行vue-component
 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
