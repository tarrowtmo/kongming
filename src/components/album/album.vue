<template>
  <div class="main">
    <div class="headerImg">
      <img src="../../assets/Imgs/logo.jpg" />
    </div>
    <div id="container">
      <div class="searAndAdd">
        <el-row>
          <el-col :xs="13" :sm="13" :md="13" :lg="13" :xl="13">
            <el-input
              placeholder="请输入查询标题"
              @clear="beClear"
              v-model="searchContent"
              @keyup.enter.native="queryOne(searchContent)"
              @focus="focus"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="queryOne(searchContent)"
              ></el-button>
            </el-input>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" :offset="5">
            <el-button type="primary" @click="addContent">添加分享</el-button>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="10" class="title">
        <el-col
          :xs="12"
          :sm="12"
          :md="6"
          :lg="3"
          :xl="3"
          v-for="(item, index) in list2"
          :key="index"
        >
          <el-tag
            type
            effect="dark"
            @click="changeList(item.text, index)"
            :class="{ highLight: indexxx === index }"
            >{{ item.text }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row class="content" :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div
            class="innerContent"
            v-for="(item, index) in queryOne(searchContent)"
            :key="index"
          >
            <h2 @click="toLink(item.src)">{{ item.title }}</h2>
            <p>{{ item.text }}</p>
            <div class="footer">
              <span class="iconfont icon-rili">&nbsp;{{ item.time }}</span>
              <span>#{{ item.name }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="添加你的分享"
      :visible.sync="dialogVisible"
      :width="widthh"
      @close="closeEvent"
    >
      <el-form
        ref="addForms"
        :model="addForm"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item label="添加标题" prop="title">
          <el-input style="width:70%;" v-model="addForm.title"></el-input>
        </el-form-item>
        <el-form-item label="添加简介" prop="introduction">
          <el-input
            style="width:70%;"
            v-model="addForm.introduction"
          ></el-input>
        </el-form-item>
        <el-form-item label="添加链接" prop="link">
          <el-input style="width:70%;" v-model="addForm.link"></el-input>
        </el-form-item>
        <el-form-item label="添加标签" prop="tag">
          <el-select v-model="addForm.tag" clearable placeholder="请选择">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'word',
  data() {
    return {
      list: [],
      list2: [
        {
          id: 0,
          text: 'CSS'
        },
        {
          id: 1,
          text: 'JS'
        },
        {
          id: 2,
          text: 'Vue'
        },
        {
          id: 3,
          text: 'Git'
        },
        {
          id: 4,
          text: 'Func'
        },
        {
          id: 6,
          text: 'Others'
        },
        {
          id: 6,
          text: 'Extend'
        },
        {
          id: 7,
          text: 'All'
        }
      ],
      afterList: '',
      indexxx: 7,
      // 搜索文本
      searchContent: '',
      flag: true,
      name: 'All',
      // 添加框显示
      dialogVisible: false,
      // 表单对象
      addForm: {
        title: '',
        introduction: '',
        time: new Date(),
        tag: '',
        link: ''
      },
      // 校验规则
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 1, max: 255, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '请输入简介', trigger: 'blur' },
          { min: 1, max: 255, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        link: [{ required: true, message: '请输入链接', trigger: 'blur' }],
        tag: [{ required: true, message: '请输入标签', trigger: 'change' }]
      },
      widthh: '70%',
      // 多选组
      options: [
        {
          value: 'CSS',
          label: 'CSS'
        },
        {
          value: 'Git',
          label: 'Git'
        },
        {
          value: 'JS',
          label: 'JS'
        },
        {
          value: 'Vue',
          label: 'Vue'
        },
        {
          value: 'Func',
          label: 'Func'
        },
        {
          value: 'Others',
          label: 'Others'
        },
        {
          value: 'Extend',
          label: 'Extend'
        }
      ]
    }
  },
  methods: {
    getList() {
      this.axios
        .get('api/noteCard')
        .then(res => {
          this.list = res.data.data
          this.afterList = this.list
        })
        .catch(err => {
          console.log(err)
        })
    },
    toLink(src) {
      window.open(src, '_blank')
    },
    changeList(name, index) {
      this.flag = false
      this.name = name
      this.indexxx = index
    },
    // 搜索数据
    queryOne(text) {
      if (this.flag === true) {
        return (this.afterList = this.list.filter(element => {
          return element.title.includes(text)
        }))
      } else if (this.flag === false) {
        return (this.afterList = this.list.filter(element => {
          if (this.name === 'All') {
            return this.list
          } else return element.name === this.name
        }))
      }
    },
    focus() {
      this.flag = true
    },
    beClear() {
      this.afterList = this.list
    },
    // 添加分享
    addContent() {
      if (this._isMobile()) {
        this.widthh = '100%'
      } else this.widthh = '70%'
      this.dialogVisible = true
    },
    _isMobile() {
      const fmobile = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
      return fmobile
    },
    // 重置表单
    reset() {
      this.$refs.addForms.resetFields()
    },
    // 取消提交
    cancel() {
      this.dialogVisible = false
    },
    // 确认提交
    confirm() {
      // 表单预验证
      this.$refs.addForms.validate(async valid => {
        if (!valid) return false
        let { title, introduction, time, tag, link } = this.addForm
        time = this.time
        const data = await this.$http.post('api/noteCard', {
          params: {
            title,
            introduction,
            time,
            tag,
            link
          }
        })
        if (data.status !== 200) {
          console.log(data.status)
          return this.$message.error('提交失败')
        } else {
          this.$message.success('添加成功')
          this.getList()
          this.dialogVisible = false
        }
      })
    },
    // 对话框关闭事件
    closeEvent() {
      this.value = ''
      this.reset()
    }
  },
  computed: {
    time: function() {
      const dt = new Date()
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')
      return `${y}/${m}/${d}`
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/CSS/album/album.less';
@import '../../assets/font2/iconfont.css';
</style>
