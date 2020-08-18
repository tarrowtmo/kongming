<template>
  <div class="container">
    <img class="bgc" src="../../assets/Imgs/bg.jpg" />
    <div class="leader">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item style="font-size: 20px;" :to="{ path: '/login' }"
          >登录</el-breadcrumb-item
        >
        <el-breadcrumb-item style="font-size: 20px;"
          >忘记密码</el-breadcrumb-item
        >
      </el-breadcrumb>
      <!-- 步骤条区域 -->
      <div class="progress">
        <el-steps :active="actived" finish-status="success" simple>
          <el-step title="信息" @click.native="next"></el-step>
          <el-step title="密码"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    next() {
      this.$router.push('/forget')
      console.log(this.actived)
    },
    ...mapMutations(['setActived']),
    ...mapActions(['removeActived', 'removeFormUser'])
  },
  watch: {
    '$route.path'(newval, oldval) {
      if (newval === '/ForgetSon') {
        this.setActived(0)
      } else if (newval === '/ForgetGrandSon') {
        this.setActived(1)
      }
    }
  },
  computed: {
    ...mapState(['actived'])
  },
  destroyed() {
    this.removeActived()
    this.removeFormUser()
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/CSS/forget/forget.less';
</style>
