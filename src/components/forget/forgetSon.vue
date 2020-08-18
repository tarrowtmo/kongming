<template>
  <div>
    <el-form :model="forgetForm" :rules="rules" ref="forgetRef">
      <el-form-item prop="userName">
        <!-- 用户名 -->
        <el-input
          placeholder="请输入账户"
          prefix-icon="el-icon-user"
          v-model="forgetForm.userName"
        ></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item prop="email">
        <el-input
          placeholder="请输入您注册时的邮箱"
          prefix-icon="el-icon-message"
          v-model="forgetForm.email"
          @keyup.enter.native="submit"
        ></el-input>
      </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item class="button_item">
        <button type="button" class="submit_button" @click="submit">
          提交
        </button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
      },
      forgetForm: {
        userName: '',
        email: ''
      }
    }
  },
  methods: {
    submit() {
      this.$refs.forgetRef.validate(async valid => {
        if (!valid) return false
        const { userName, email } = this.forgetForm
        const res = await this.$http.get('api/forget', {
          params: {
            userName,
            email
          }
        })
        if (res.status !== 200) {
          return this.$message.error('失败')
        } else {
          if (res.body.length === 0) {
            this.reset()
            return this.$message.error('不存在此用户')
          } else {
            let a = this.actived
            a += 1
            this.setActived(a)
            this.setFormUser(userName)
            this.$router.push('/ForgetGrandSon')
          }
        }
      })
    },
    reset() {
      this.$refs.forgetRef.resetFields()
    },
    ...mapMutations(['setActived', 'setFormUser'])
  },
  computed: {
    ...mapState(['actived'])
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
</style>
