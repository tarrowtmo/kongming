<template>
  <div class="container">
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <img
          style="display:block;width:100%;height:100%;"
          src="../../assets/Imgs/liuyan.jpg"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-form
          :model="formtext"
          ref="commentFormRef"
          :rules="commentFormRules"
        >
          <el-form-item prop="text">
            <el-input
              class="inputt"
              type="textarea"
              placeholder="想到什么就写下来吧"
              v-model="formtext.text"
              maxlength="30"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item class="comment_btn">
            <el-button type="primary" @click="send">发送</el-button>
            <el-button type="warning" @click="reset">清空</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="comment_title">
          <span>全部留言</span>
          <span>{{ total }}</span>
        </div>
        <transition-Group appear tag="ul">
          <li
            v-for="(item, index) in list"
            :key="index"
            :style="index === indeHeight ? heighter : height"
            ref="comment"
          >
            <div class="comment_content">
              <!-- 头像 -->
              <div class="comment_img">
                <img :src="item.userImg" />
              </div>
              <div class="inner_comment">
                <!-- 用户名 -->
                <div class="inner_comment_title">
                  <span>{{ item.username }}</span>
                  <span>{{ item.time | dataformat }}</span>
                </div>
                <!-- 发言内容 -->
                <div style="font-size:18px;">{{ item.comments }}</div>
                <!-- 按钮组 -->
                <div class="btnGroup">
                  <span @click="letCommentShow(index)">回复</span>
                  <span @click="deleteComment(item.id)">删除</span>
                </div>
                <!-- 回复留言 -->
                <div
                  class="reCommentContent"
                  v-for="(item02, index02) in item.content"
                  :key="index02"
                >
                  <div>
                    <div class="info">
                      <span>
                        <img :src="item02.userImg" />
                      </span>
                      <span>{{ item02.user }}</span>
                      <span>&nbsp;回复&nbsp;</span>
                      <span>@{{ item02.recommentuser }}</span>
                    </div>
                    <div class="re_content">
                      <span>{{ item02.comments }}</span>
                    </div>
                  </div>
                  <div class="btnGroup">
                    <span @click="letCommentShow2(index, index02)">回复</span>
                  </div>
                </div>
                <!-- 回复内容 -->
                <div class="commentShow" v-show="index === indeXXX">
                  <img :src="reCommenImg" />
                  <el-input
                    type="textarea"
                    class="inputt2"
                    :placeholder="'@' + recommentuser"
                    v-model="reComments"
                    maxlength="30"
                    show-word-limit
                  ></el-input>
                  <el-button type="primary" @click="reSend">发送</el-button>
                </div>
              </div>
            </div>
            <!-- :style="index === indeHeight ? ifShow : ''" -->
            <button
              @click="beHeighter(index)"
              v-show="index !== indeHeight"
              style="position:absolute;right:0;bottom:0;"
            >
              查看更多
            </button>
            <div class="li_footer"></div>
          </li>
        </transition-Group>
        <el-pagination
          style="display:block;"
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :pagerCount="5"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'word',
  data() {
    return {
      formtext: {
        text: ''
      },
      // 回复内容
      reComments: '',
      // 表单校验规则
      commentFormRules: {
        text: [{ required: true, message: '空空的可不行~', trigger: 'click' }]
      },
      // 回复用头像
      reCommenImg: '',
      // 回复的用户名
      recommentuser: '',
      // 二级回复的头像
      reUserImg: '',
      // 评论内容组
      list: [],
      // 回复内容组(1)
      reList: [],
      // 删除按钮是否显示
      indexX: NaN,
      // 回复框是否显示
      indeXXX: NaN,
      // 提交时间
      time: '',
      // 获取用户列表的参数对象
      currentPage: 1, // 当前页
      total: 0, // 数据总条数
      pageSize: 4, // 每页条数
      // 评论的唯一值
      uniCode: '',
      // li变高
      heighter: {
        height: 'auto'
      },
      height: {
        'max-height': '300px'
      },
      // ifShow: {
      //   display: 'none'
      // },
      indeHeight: NaN
      // pageSize2: 2, // 每页显示
      // number: 0, // 判断点击是哪个分页
      // testArray: [],
      // total2: 0
    }
  },
  methods: {
    // 提交
    send() {
      // 表单预验证
      this.$refs.commentFormRef.validate(async valid => {
        if (!valid) return false
        // id
        // const listId = this.list.length + 1
        let listId
        if (this.list.length === 0) {
          listId = this.list.length + 1
        } else {
          listId = this.list[0].id + 1
        }
        // 收集当前页码 和 每页显示条数
        const pageSize = this.pageSize
        const currentPage = this.currentPage
        // 获取点击提交按钮的时间
        const time = new Date()
        const username = this.information
        const userImg = this.userImg
        const comment = this.formtext.text
        const ip = localStorage.getItem('Ip')
        const data = await this.$http.post('api/comment', {
          params: {
            time,
            comment,
            pageSize,
            currentPage,
            listId,
            username,
            userImg,
            ip
          }
        })
        if (data.status !== 200) {
          return this.$message.error('发表失败')
        } else {
          this.reset()
          // this.getList()
          // this.getReList()
          this.getAllData()
          this.indeXXX = -1
        }
      })
    },
    // 回复提交
    async reSend() {
      if (this.reComments.trim().length > 0) {
        // id
        const listId = this.uniCode + '' + this.reList.length + 1
        // 获取点击提交按钮的时间
        const time = new Date()
        const comment = this.reComments
        const user = this.information
        const recommentuser = this.recommentuser
        const reUserImg = this.reUserImg
        const userImg = this.userImg
        const ip = localStorage.getItem('Ip')
        const data = await this.$http.post('api/reComment', {
          params: {
            time,
            comment,
            listId,
            user,
            recommentuser,
            reUserImg,
            userImg,
            ip
          }
        })
        if (data.status !== 200) {
          return this.$message.error('失败')
        } else {
          this.reComments = ''
          if (this.list.length > 0) {
            for (let i = 0; i < this.list.length; i++) {
              this.list[i].content = []
            }
          }
          // this.getList()
          // this.getReList()
          this.getAllData()
          this.indeXXX = -1
        }
      } else {
        alert('请输入回复内容')
      }
    },
    // 重置
    reset() {
      this.$refs.commentFormRef.resetFields()
    },
    // 获取表单
    getList() {
      // 收集当前页码 和 每页显示条数
      const pageSize = this.pageSize
      const currentPage = this.currentPage
      return this.axios
        .get('api/comment', {
          params: {
            pageSize,
            currentPage
          }
        })
        .then(results => {
          const { total, data } = results.data
          this.total = total
          this.list = data
          this.list.forEach(item => {
            item.userImg = require('../../../server/routes/uploads/' +
              item.userImg)
          })
        })
    },
    // 获取回复表单
    getReList() {
      return this.axios.get('api/reComment').then(results => {
        const { data } = results.data
        this.reList = data
        this.reList.forEach(item => {
          item.userImg = require('../../../server/routes/uploads/' +
            item.userImg)
        })
        for (let i = 0; i < this.list.length; i++) {
          for (let j = 0; j < this.reList.length; j++) {
            if (this.list[i].id === parseInt(this.reList[j].Id.substr(0, 1))) {
              this.list[i].content.push(this.reList[j])
            }
          }
        }
      })
    },
    // 删除评论
    deleteComment(id) {
      this.$prompt('请输入管理员密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '密码错误',
        inputValidator: value => {
          if (value !== '200016') {
            return '密码错误'
          }
        }
      })
        .then(({ value }) => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.axios.get(`api/comment/${id}`).then(results => {})
          // this.getList()
          // this.getReList()
          this.getAllData()
          this.indeXXX = -1
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消删除'
          })
        })
    },
    // 使回复框显示
    letCommentShow(index) {
      this.recommentuser = `${this.list[index].username}`
      this.reUserImg = `${this.list[index].userImg}`
      this.indeXXX = index
      this.uniCode = this.list[index].id
      this.beHeighter(index)
    },
    // 使回复框显示
    letCommentShow2(index, index02) {
      this.recommentuser = `${this.list[index].content[index02].user}`
      this.reUserImg = `${this.list[index].content[index02].userImg}`
      this.indeXXX = index
      this.uniCode = this.list[index].id
      this.beHeighter(index)
    },
    // 当前页码改变 就会触发这个函数
    handleCurrentChange(val) {
      // 保存当前页码
      this.currentPage = val
      // 调用分页函数
      // this.getList()
      // this.getReList()
      this.getAllData()
    },
    // 变高
    beHeighter(index) {
      this.indeHeight = index
    },
    // 异步获取数据改为同步
    async getAllData() {
      await this.getList()
      await this.getReList()
      // new Promise((resolve, reject) => {
      //   this.getList()
      //   resolve()
      // }).then(res => {
      //   this.getReList()
      // })
    }
  },
  computed: {
    ...mapState(['information', 'userImg'])
  },
  mounted() {
    this.reCommenImg = require('../../../server/routes/uploads/' + this.userImg)
    // this.getList()
    // this.getReList()
    this.getAllData()
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/CSS/comments/comment.less';
</style>
