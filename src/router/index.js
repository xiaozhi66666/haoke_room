import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')

  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ', // 如果路径设置为空，则为默认路径
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'search',
        name: 'search',
        // component: () => import('@/views/search'),
        redirect: '/list'
      },
      {
        path: 'news',
        name: 'news',
        component: () => import('@/views/news')
      }, {
        path: 'my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  }, {
    path: '/city',
    name: 'city',
    component: () => import('@/views/city')
  },
  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/list')
  }
]

const router = new VueRouter({
  routes
})

export default router
