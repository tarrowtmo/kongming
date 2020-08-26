import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'
const Home = () =>
  import(/* webpackChunkName: "Home_Note" */ '../components/home.vue')
const Note = () =>
  import(/* webpackChunkName: "Home_Note" */ '../components/notes/note.vue')

const Login = () =>
  import(/* webpackChunkName: "Login_Register" */ '../components/login.vue')
const Register = () =>
  import(/* webpackChunkName: "Login_Register" */ '../components/register.vue')

const Forget = () =>
  import(
    /* webpackChunkName: "Forget_ForgetSon_ForgetGrandSon" */ '../components/forget/forget.vue'
  )
const ForgetSon = () =>
  import(
    /* webpackChunkName: "Forget_ForgetSon_ForgetGrandSon" */ '../components/forget/forgetSon.vue'
  )
const ForgetGrandSon = () =>
  import(
    /* webpackChunkName: "Forget_ForgetSon_ForgetGrandSon" */ '../components/forget/forgetGrandSon.vue'
  )

const Header = () =>
  import(
    /* webpackChunkName: "Header_Baidu_Comments_Album_About" */ '../components/blog/header.vue'
  )
const Baidu = () =>
  import(
    /* webpackChunkName: "Header_Baidu_Comments_Album_About" */ '../components/article/baiduyun.vue'
  )
const Comments = () =>
  import(
    /* webpackChunkName: "Header_Baidu_Comments_Album_About" */ '../components/comments/comments.vue'
  )
const Album = () =>
  import(
    /* webpackChunkName: "Header_Baidu_Comments_Album_About" */ '../components/album/album.vue'
  )
const About = () =>
  import(
    /* webpackChunkName: "Header_Baidu_Comments_Album_About" */ '../components/about/about.vue'
  )

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
    path: '/forget',
    component: Forget,
    redirect: '/ForgetSon',
    children: [
      {
        path: '/ForgetSon',
        component: ForgetSon
      },
      {
        path: '/ForgetGrandSon',
        component: ForgetGrandSon
      }
    ]
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
/*  ------------------ 路由重复 -----------------------------  */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/ForgetGrandSon') {
    if (store.state.formUser === '') return next('/ForgetSon')
    else return next()
  }
  if (
    to.path === '/login' ||
    to.path === '/register' ||
    to.path === '/forget' ||
    to.path === '/ForgetSon'
  ) {
    return next()
  }

  const tokenstr = window.sessionStorage.getItem('token')
  if (!tokenstr) {
    return next('/login')
  }
  next()
})
export default router
