import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home.vue'
import Header from '../components/blog/header.vue'
import Note from '../components/notes/note.vue'
import Baidu from '../components/article/baiduyun.vue'
import Comments from '../components/comments/comments.vue'
import Album from '../components/album/album.vue'
import About from '../components/about/about.vue'
import Login from '../components/login.vue'
import Register from '../components/register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/header',
    component: Header,
    redirect: '/Baidu',
    children: [
      {
        path: '/Baidu',
        component: Baidu
      },
      {
        path: '/Comments',
        component: Comments
      },
      {
        path: '/Album',
        component: Album
      },
      {
        path: '/About',
        component: About
      }
    ]
  },
  {
    path: '/note',
    component: Note
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: '/www/wwwroot/tarrowtmo.cn',
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') return next()
  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) {
    return next('/login')
  } next()
})
export default router
