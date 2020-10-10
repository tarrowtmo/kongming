<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import CanvasNest from 'canvas-nest-class.js'
const config = {
  color: '255, 0, 0',
  pointColor: '255, 155, 0',
  opacity: 1,
  count: 222,
  zIndex: 99
}
export default {
  name: 'app',
  created() {
    const fmobile = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
    if (!fmobile) {
      this.$nextTick(() => {
        /* eslint-disable no-new */
        new CanvasNest(document.querySelector('.container'), config)
      })
    }
  }
}
</script>

<style></style>
