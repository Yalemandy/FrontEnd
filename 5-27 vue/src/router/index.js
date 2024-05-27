// 引入vue 和vuerouter
import VueRouter from 'vue-router'
import Vue from 'vue'
import { getUserinfo } from "@/utils/storage.js"
import layout from "@/views/layout/index.vue"
import login from "@/views/login/index.vue"
import search from "@/views/search/index.vue"
import searchlist from "@/views/search/searchlist.vue"
import prodetail from "@/views/prodetail/index.vue"
import pay from "@/views/pay/index.vue"
import myorder from "@/views/myorder/index.vue"

import home from "@/views/layout/home.vue"
import category from "@/views/layout/category.vue"
import cate from "@/views/layout/cate.vue"
import user from "@/views/layout/user.vue"
import { Toast } from 'vant'
// 组件初始化
Vue.use(VueRouter)

// 创建路由对象
const router = new VueRouter({
  // routes 路由规则们
  routes: [
    // 首页
    {
      path: '/' ,
      component: layout,
      redirect: '/home',
      children: [
        { path: '/home', component: home },
        { path: '/category', component: category },
        { path: '/cate', component: cate },
        { path: '/user', component: user },
      ]
    },
    // 登录
    { path: '/login', component: login },
    // 搜索
    { path: '/search', component: search },
    // 搜索列表
    { path: '/searchlist', component: searchlist },
    // 商品详情
    { path: '/prodetail', component: prodetail },
    // 支付
    { path: '/pay', component: pay },
    // 订单——
    { path: '/myorder', component: myorder },
  ]
})

router.beforeEach((to, from, next) => {
  const token = getUserinfo().token
  if (to.path === '/pay' || to.path === '/myorder') {
    if (token) {
      next()
    } else {
      Toast("请您先登录")
      next('/login')
    }
  } else {
    next()
  }

})

// 导出
export default router
