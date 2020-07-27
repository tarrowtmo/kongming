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
    this.$nextTick(() => {
      const cn = new CanvasNest(document.querySelector('.container'), config)
      console.log(cn)
    })
  }
}
</script>

<style></style>
