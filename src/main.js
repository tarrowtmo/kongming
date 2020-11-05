import Vue from 'vue'
import App from './App.vue'
// import './plugins/element.js'
// 导入全局样式表
import 'element-ui/lib/theme-chalk/display.css'
// 导入全局样式表
import './assets/CSS/global.css'
import VueResource from 'vue-resource'
import store from './vuex/store'
import axios from 'axios'
import router from './router'
import echarts from 'echarts'
// 导入NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 懒加载
import VueLazyload from 'vue-lazyload'
// 引入Markdown样式
import 'github-markdown-css'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/Imgs/tomcat.jpg'),
  loading: require('./assets/Imgs/loading.gif'),
  attempt: 1
})
/*  -----------------基础全局配置------------------------------  */
// axios.defaults.baseURL = 'http://api.tarrowtmo.cn/'
// axios.defaults.baseURL = 'http://localhost:8083/index/'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
/*  -----------------------------------------------  */
// 在request拦截器中,展示进度条NProgress.start()
axios.interceptors.request.use(config => {
  NProgress.start()
  return config
})
// 在response拦截器中,隐藏进度条NProgress.done()
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.$echarts = echarts

// 全局过滤器
Vue.filter('dataformat', function(originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  /* padstart()用于头部补全
    第一个形参表示字符创总共的长度
    第二个形参表示长度不足时用什么补全 */
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}年 ${m}月 ${d}日 ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
