<template>
  <div class="container">
    <el-row ref="el_row">
      <el-col>
        <img id="back1" :src="head_Img" title="退出" />
        <img
          id="back2"
          src="../../assets/Imgs/logoout3.png"
          @click="logout"
          title="退出"
        />
      </el-col>
      <el-col class="hidden-xs-only">
        <ul>
          <li
            v-for="(item, index) in list"
            :key="index"
            :class="{ highlight: id === index }"
            @click="changeRouter(index + 1)"
          >
            {{ item.word }}
          </li>
        </ul>
      </el-col>
      <el-col style="float:right">
        <div class="hidden-xs-only">欢迎来到Tarrowtmo的博客~</div>
        <img
          :class="[flag ? 'go' : 'aa']"
          @click="rotate"
          style="display:none"
          :src="flag2"
        />
      </el-col>
    </el-row>
    <ul class="ul2" v-show="flag">
      <li
        v-for="(item, index) in list"
        :key="index"
        @click="changeRouter(index + 1)"
      >
        {{ item.word }}
      </li>
    </ul>
    <router-view></router-view>
    <div
      ref="el_div"
      :class="[flagg ? 'appear' : 'backTop']"
      @click="backToTop"
    >
      <img src="../../assets/Imgs/up.png" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'word',
  data() {
    return {
      // 进行属性绑定的判定值
      id: 0,
      // 旋转图片用判断布尔值
      flag: false,
      // 旋转图片用图片地址存储
      flag2: null,
      list: [
        { word: '动画' },
        // { word: '微语' },
        { word: '留言' },
        { word: '分享' },
        { word: '关于' }
      ],
      // 回到顶部所绑定的类
      flagg: false,
      // 进度条长度
      scrollLength: 0,
      // 头像
      head_Img: ''
    }
  },
  methods: {
    // 点击切换导航栏高亮
    changeRouter(index) {
      this.id = index - 1
      switch (this.id) {
        case 0: {
          this.$router.push('/Baidu')
          this.flag = false
          this.flag2 = require('../../assets/Imgs/menu.png')
          break
        }
        case 1: {
          this.$router.push('/Comments')
          this.flag = false
          this.flag2 = require('../../assets/Imgs/menu.png')
          break
        }
        case 2: {
          this.$router.push('/Album')
          this.flag = false
          this.flag2 = require('../../assets/Imgs/menu.png')
          break
        }
        case 3: {
          this.$router.push('/About')
          this.flag = false
          this.flag2 = require('../../assets/Imgs/menu.png')
          break
        }
      }
    },
    // 点击旋转
    rotate() {
      this.flag = !this.flag
      if (this.flag === true) {
        this.flag2 = require('../../assets/Imgs/cha.png')
      } else if (this.flag === false) {
        this.flag2 = require('../../assets/Imgs/menu.png')
      }
      // 判断是否是手机端
      if (this._isMobile()) {
      } else {
        const timer = setInterval(() => {
          // 当导航栏长度超过767时改变菜单图片
          if (this.$refs.el_row.$el.offsetWidth > 767) {
            this.flag = false
            this.flag2 = require('../../assets/Imgs/menu.png')
            clearInterval(timer)
          }
        }, 1)
      }
    },
    _isMobile() {
      const fmobile = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
      return fmobile
    },
    // 滚动条长度
    scrollToTop() {
      const height =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      this.scrollLength = height
      if (this.scrollLength > 200) {
        this.flagg = true
      } else {
        this.flagg = false
      }
    },
    // 回到顶部
    backToTop() {
      const timer = setInterval(() => {
        const ispeed = Math.floor(-this.scrollLength / 5)
        document.documentElement.scrollTop = document.body.scrollTop =
          this.scrollLength + ispeed
        if (this.scrollLength === 0) {
          this.flagg = false
          clearInterval(timer)
        }
      }, 16)
    },
    // 退出
    logout() {
      // window.sessionStorage.removeItem('token')
      // window.sessionStorage.clear()
      // 删除token,个人信息,头像
      this.removeToken()
      this.removeInformation()
      this.removeUserImg()
      this.$router.push('/login')
    },
    ...mapActions(['removeToken', 'removeInformation', 'removeUserImg'])
  },
  computed: {
    ...mapState(['userImg'])
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop)
    // this.head_Img = require('../../../server/routes/uploads/' + this.userImg)
    this.head_Img = 'http://tarrowtmo.cn/mineImg/' + this.userImg
    this.flag2 = require('../../assets/Imgs/menu.png')
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollToTop)
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/CSS/blog/header.less';
</style>
