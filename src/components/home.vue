<template>
  <div class="home_container">
    <div class="Box">
      <div v-for="(item, index) in iconsObj" :key="index" @click="skipTo(item.dex)">
        <span :class="item.icon"></span>
        {{item.text}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      // div内的字体文件和文本
      iconsObj: {
        1: {
          icon: 'iconfont icon-wendang',
          text: '我的笔记',
          dex: 1
        },
        2: {
          icon: 'iconfont icon-ai-code',
          text: '我的博客',
          dex: 2
        }
      },
      // 请求到的数据
      getData: null
    }
  },
  methods: {
    skipTo(index) {
      switch (index) {
        case 1: {
          this.$router.push('/note')
          break
        }
        case 2: {
          this.$router.push('/header')
          break
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import '../assets/CSS/Box.less';
@import '../assets/font/iconfont.css';
</style>
