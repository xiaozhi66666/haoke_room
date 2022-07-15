import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/login')

  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ', // 如果路径设置为空，则为默认路径
        // name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'search',
        component: () => import('@/views/search')
      },
      {
        path: 'news',
        component: () => import('@/views/news')
      }, {
        path: 'my',
        component: () => import('@/views/my')
      }
    ]
  }, {
    path: '/city',
    component: () => import('@/views/city')
  },
  {
    path: '/list',
    component: () => import('@/views/list')
  }
]

const router = new VueRouter({
  routes
})

export default router
