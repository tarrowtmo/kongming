module.exports = {
  // publicPath: '/www/wwwroot/tarrowtmo.cn',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    open: true, // 是否自动弹出浏览器页面
    host: 'localhost',
    port: '8083',
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // API服务器的地址
        ws: true, // 代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: { // 重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'element-ui': 'ELEMENT',
      echarts: 'echarts',
      nprogress: 'NProgress',
      axios: 'axios'
    }
  }
}
// module.exports = {
//   // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
//   devServer: {
//     open: true, // 是否自动弹出浏览器页面
//     https: false,
//     hotOnly: false,
//     port: 8083,
//     proxy: {
//       '/api': {
//         target: 'http://api.tarrowtmo.cn', // API服务器的地址
//         // ws: true, // 代理websockets
//         changeOrigin: true, // 虚拟的站点需要更管origin
//         pathRewrite: {
//           // 重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
//           '^/api': ''
//         }
//       }
//     }
//   },
//   configureWebpack: {
//     externals: {
//       vue: 'Vue',
//       'element-ui': 'ELEMENT',
//       echarts: 'echarts',
//       nprogress: 'NProgress',
//       axios: 'axios'
//     }
//   }
// }
