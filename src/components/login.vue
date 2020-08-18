<template>
  <div class="main_body">
    <div class="header_img">
      <img src="../assets/Imgs/login_user.png" />
    </div>
    <div class="header_title">
      <h2>
        登录到
        <span>Tarrowtmo</span>
      </h2>
    </div>
    <div class="contaienr">
      <el-form :model="loginForm" :rules="rules" ref="loginRef">
        <!-- 账号 -->
        <el-form-item label="用户名" prop="user">
          <el-input placeholder="请输入账户" prefix-icon="el-icon-user" v-model="loginForm.user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-edit"
            v-model="loginForm.password"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <button type="button" class="login_button" @click="login">登录</button>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <span style="cursor:pointer" @click="forget">忘记密码</span>
      <strong>|</strong>
      <span style="cursor:pointer" @click="toRegis">注册账号</span>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        user: '',
        password: ''
      },
      rules: {
        user: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginRef.validate(async valid => {
        if (!valid) return false
        const { user, password } = this.loginForm
        const res = await this.$http.post('api/login', {
          params: {
            user,
            password
          }
        })
        if (res.status !== 200) {
          return this.$message.error('登录失败')
        } else {
          if (res.data.data.length === 0) {
            this.reset()
            return this.$message.error('账号或密码有误,请重新输入')
          } else {
            this.updatetoken(res.data.token)
            this.updateInformation(res.data.infomation.user)
            this.updateUserImg(res.body.data[0].userImg)
            this.$router.push('/home')
            return this.$message.success('登录成功')
          }
        }
      })
    },
    // 前往注册
    toRegis() {
      this.$router.push('/register')
    },
    // 忘记密码
    forget() {
      this.$router.push('/forget')
    },
    // 重置
    reset() {
      this.$refs.loginRef.resetFields()
    },
    ...mapActions(['updatetoken', 'updateInformation', 'updateUserImg'])
  }
}
</script>
<style lang="less" scoped>
@import '../assets/CSS/login/login.less';
</style>
