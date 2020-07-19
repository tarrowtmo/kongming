<template>
  <div class="container">
    <div class="about">
      <el-row class="rowContainer">
        <el-col class="col1" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-row class="rooo">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <h2>我的介绍</h2>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <img src="../../assets/Imgs/xc_img1.jpg" />
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div>
                <p>Tarrowtmo</p>
                <p>20岁</p>
                <p>学生</p>
                <p>爱看动漫，爱打游戏</p>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <h2>我的技能</h2>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="8">
              <img src="../../assets/Imgs/css3.jpg" />
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="8">
              <img src="../../assets/Imgs/HTML5.jpg" />
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="8">
              <img src="../../assets/Imgs/java.jpg" />
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="8">
              <img src="../../assets/Imgs/JS.jpg" />
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="8">
              <img src="../../assets/Imgs/node.jpg" />
            </el-col>
            <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="8">
              <img src="../../assets/Imgs/vue.jpg" />
            </el-col>
          </el-row>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <el-row>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <h2>联系方式</h2>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <img src="../../assets/Imgs/erweima.jpg" />
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <p>
                微信
                <span class="WeChat">dj4596xidjj</span>
              </p>
              <p>
                手机
                <span class="iphone">18296681811</span>
              </p>
              <p>
                邮箱
                <span class="email">1506286596@qq.com</span>
              </p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>
<style lang="less" scoped>
@import '../../assets/CSS/about/about.less';
</style>
