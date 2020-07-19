<template>
  <div class="main_body">
    <div class="header_title">
      <h2>创建账户</h2>
    </div>
    <div class="contaienr">
      <el-form :model="registerForm" :rules="rules" ref="registerRef">
        <!-- 账号 -->
        <el-form-item label="用户名" prop="user">
          <el-input placeholder="请输入账户" prefix-icon="el-icon-user" v-model="registerForm.user"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input placeholder="请输入邮箱" prefix-icon="el-icon-edit" v-model="registerForm.email"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-edit"
            v-model="registerForm.password"
          ></el-input>
        </el-form-item>
        <!-- 性别 -->
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="registerForm.gender" @change="change_Selection">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 出生年月日 -->
        <el-form-item label="出生日期:" prop="date">
          <el-date-picker type="date" placeholder="选择出生年月" v-model="registerForm.date"></el-date-picker>
        </el-form-item>
        <!-- 上传头像 -->
        <el-form-item label="头像:" prop="dialogImageUrl">
          <el-upload
            action="api/upload"
            enctype="multipart/form-data"
            method="post"
            ref="upload"
            list-type="picture-card"
            :on-success="afterUpload"
            :on-change="changeurl"
            :on-preview="handlePictureCardPreview"
            :before-upload="beforeAvatarUpload"
            :on-remove="handleRemove"
            :auto-upload="false"
          >
            <i class="el-icon-camera-solid"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl2" />
          </el-dialog>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <button type="button" class="login_button" @click="submit">注册</button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    const validateEmail = (rule, value, callback) => {
      const REGEXP = new RegExp(
        /^([a-zA-Z]|[0-9])(\w)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      )
      if (value === '') {
        callback(new Error('请输入邮箱地址'))
      } else if (!REGEXP.test(value)) {
        callback(new Error('请输入邮箱邮箱'))
      } else {
        callback()
      }
    }
    return {
      number: 1,
      registerForm: {
        user: '',
        code: '',
        email: '',
        password: '',
        gender: '男',
        date: '',
        dialogImageUrl: ''
      },
      canBeRegist: false,
      rules: {
        user: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        email: [{ validator: validateEmail, required: true, trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择你的性别', trigger: 'change' }
        ],
        date: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        dialogImageUrl: [
          { required: true, message: '请选择你的头像', trigger: 'change' }
        ]
      },
      // 图片上传组件
      dialogVisible: false,
      dialogImageUrl2: ''
    }
  },
  methods: {
    change_Selection(val) {
      console.log(this.registerForm.date)
    },
    // 注册
    submit() {
      // 提交图片
      this.$refs.upload.submit()
      // 表单预验证
      this.$refs.registerRef.validate(async valid => {
        if (!valid) return false
        this.emailTest()
      })
    },
    // 检验邮箱是否已被注册
    emailTest() {
      const user = this.registerForm.user
      const email = this.registerForm.email
      this.axios
        .get('api/testEmail', {
          params: {
            email,
            user
          }
        })
        .then(res => {
          console.log(res)
          if (res.data.length === 0) {
            this.canBeRegist = true
            console.log('可以注册情况下' + this.canBeRegist)
          } else {
            this.canBeRegist = false
            console.log('不可以注册情况下' + this.canBeRegist)
          }
          return this.canBeRegist
        })
        .then(async res => {
          if (res === true) {
            const {
              user,
              email,
              password,
              gender,
              date,
              dialogImageUrl
            } = this.registerForm
            const data = await this.$http.post('api/postForm', {
              params: {
                user,
                email,
                password,
                gender,
                date,
                dialogImageUrl
              }
            })
            console.log(data)
            if (data.status !== 200) {
              console.log(data.status)
              return this.$message.error('提交失败')
            } else {
              // 提交图片
              // this.$refs.upload.submit()
              this.$router.push('/login')
              this.$message.success('恭喜，注册成功')
            }
          } else if (res === false) {
            this.$refs.registerRef.resetFields()
            return this.$message.error('该邮箱或用户名已被注册')
          }
        })
    },
    // 重置表单
    reset() {
      this.$refs.registerRef.resetFields()
    },
    // 文件上传方法
    // 删除图片
    handleRemove(file, fileList) {
      this.registerForm.dialogImageUrl = ''
    },
    // 预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl2 = file.url
      this.dialogVisible = true
    },
    // 上传之后
    afterUpload(res, file) {
      // this.registerForm.dialogImageUrl = res.file.url
      console.log(res)
    },
    changeurl(file, fileList) {
      // this.registerForm.dialogImageUrl =
      //   '../../../server/routes/uploads/' + file.name
      this.registerForm.dialogImageUrl = file.name
      // console.log(file)
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style lang="less" scoped>
@import '../assets/CSS/register/register.less';
</style>
