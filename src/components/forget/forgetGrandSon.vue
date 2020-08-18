<template>
  <div>
    <el-form v-if="flag" :model="changeForm" :rules="rules" ref="changeRef">
      <el-form-item>
        <!-- 用户名 -->
        <el-input
          prefix-icon="el-icon-user"
          v-model="formUser"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <!-- 密码 -->
        <el-input
          type="password"
          placeholder="请输入新密码"
          prefix-icon="el-icon-edit"
          v-model="changeForm.password"
        ></el-input>
      </el-form-item>
      <!-- 确认密码 -->
      <el-form-item prop="checkPassword">
        <el-input
          type="password"
          placeholder="确认密码"
          prefix-icon="el-icon-success"
          v-model="changeForm.checkPassword"
          @keyup.enter.native="submit"
        ></el-input>
      </el-form-item>
      <!-- 修改按钮 -->
      <el-form-item class="button_item">
        <button type="button" class="submit_button" @click="submit">
          确定修改
        </button>
      </el-form-item>
    </el-form>
    <div v-else>
      <div class="jumptoLogin">
        <div>
          <p>修改密码成功,将在{{ second }}秒后跳转到登录</p>
          <el-button type="text">
            如{{ second }}秒后无响应请点击这里
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' }
        ],
        checkPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' }
        ]
      },
      changeForm: {
        password: '',
        checkPassword: ''
      },
      flag: true,
      second: 3
    }
  },
  methods: {
    submit() {
      if (this.changeForm.checkPassword !== this.changeForm.password) {
        this.reset()
        return this.$message.error('两次密码不一致')
      } else {
        this.$refs.changeRef.validate(async valid => {
          if (!valid) return false
          const { password } = this.changeForm
          const username = this.formUser
          const res = await this.$http.get('api/changePassword', {
            params: {
              password,
              username
            }
          })
          if (res.status !== 200) {
            return this.$message.error('更改失败')
          } else {
            let a = this.actived
            a += 1
            this.setActived(a)
            this.flag = false
          }
        })
      }
      // let a = this.actived
      // a += 1
      // this.setActived(a)
      // this.$router.push('/ForgetGrandSon')
    },
    reset() {
      this.$refs.changeRef.resetFields()
    },
    ...mapMutations(['setActived'])
  },
  watch: {
    flag(newval, oldval) {
      if (newval === false) {
        const timeToJump = setInterval(() => {
          this.second -= 1
          if (this.second <= 0) {
            clearInterval(timeToJump)
            this.$router.push('/login')
          }
        }, 1000)
      }
    }
  },
  computed: {
    ...mapState(['actived', 'formUser'])
  },
  mounted() {
    this.setActived(1)
  }
}
</script>
<style lang="less" scoped>
.el-form {
  width: 70%;
  margin: 5% auto;
  padding: 0;
  .el-input {
    width: 100%;
  }
  .button_item {
    .submit_button {
      display: inline-block;
      width: 50%;
      margin: 0 25%;
      height: 55px;
      line-height: 38px;
      font-size: 18px;
      border: 0px solid;
      background-color: #1074e7;
      border-radius: 5px;
      color: white;
      cursor: pointer;
    }
  }
}
.jumptoLogin {
  margin-top: 2%;
  display: flex;
  justify-content: center;
  .el-button {
    margin: 0 20%;
  }
}
</style>
