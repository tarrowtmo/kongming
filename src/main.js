import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
// 导入全局样式表
import 'element-ui/lib/theme-chalk/display.css'
import './assets/CSS/global.css'
import VueResource from 'vue-resource'
import store from './vuex/store'
import axios from 'axios'
import router from './router'
/*  -----------------基础全局配置------------------------------  */
// axios.defaults.baseURL = 'http://localhost:8083'
/*  -----------------------------------------------  */
// axios.interceptors.request.use(config => {
//   console.log(config)
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.prototype.axios = axios

// 全局过滤器
Vue.filter('dataformat', function (originVal) {
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
