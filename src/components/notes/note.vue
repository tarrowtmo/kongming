<template>
  <el-container class="note_container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>Tarrowtmo</span>
        <span>'</span>
        <span>notes</span>
      </div>
      <el-button type="info" @click="backToHome">返回</el-button>
    </el-header>
    <!-- 主体内容区域 -->
    <el-main class="main_content">
      <el-card>
        <el-tabs v-model="activeName">
          <el-tab-pane
            v-for="(item, index) in noteText"
            :key="index"
            :label="item.label"
            :name="item.name"
          >
            <el-container
              class="innerContainer"
              v-for="(innerItem, innerIndex) in item.content"
              :key="innerIndex"
            >
              <el-main>
                <el-container class="innerContainerXX">
                  <el-main>
                    <h1>{{innerItem.textHead}}</h1>
                    <div>{{innerItem.textBody}}</div>
                  </el-main>
                  <el-aside class="innerContainerXX_asider">
                    <img @click="bigImg(innerItem.imgSrc)" :src="innerItem.imgSrc" />
                  </el-aside>
                </el-container>
              </el-main>
              <el-aside class="innerContainer_asider">
                <div class="innerContainer_asider_div">
                  <a download="02" :href="innerItem.fileSrc">点击下载完整笔记</a>
                </div>
              </el-aside>
            </el-container>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-main>
    <el-dialog title="图片预览" :visible.sync="dialogVisible" width="60%">
      <img style="width:100%;height:100%" :src="fileSrc"/>
    </el-dialog>
  </el-container>
</template>
<script>
// import noteText from '../../assets/JS/note_content.js'
export default {
  name: 'word',
  data() {
    return {
      activeName: 'first',
      // 相关文本数据
      noteText: null,
      // 对话框是否显示
      dialogVisible: false,
      fileSrc: ''
    }
  },
  methods: {
    // 导向主界面
    backToHome() {
      this.$router.push('/home')
    },
    // 获取文本数据
    getList() {
      this.axios.get('api/list').then(res => {
        this.noteText = res.data
      })
    },
    bigImg(src) {
      this.fileSrc = src
      this.dialogVisible = true
    }
  },
  mounted() {
    this.getList()
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/CSS/note.less';
</style>
