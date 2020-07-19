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
              <el-button slot="append" icon="el-icon-search" @click="queryOne(searchContent)"></el-button>
            </el-input>
          </el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" :offset="5">
            <el-button type="primary">添加分享</el-button>
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
          v-for="(item,index) in list2"
          :key="index"
        >
          <el-tag
            type
            effect="dark"
            @click="changeList(item.text,index)"
            :class="{highLight: indexxx === index}"
          >{{item.text}}</el-tag>
        </el-col>
      </el-row>
      <el-row class="content" :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="innerContent" v-for="(item,index) in queryOne(searchContent)" :key="index">
            <h2 @click="toLink(item.src)">{{item.title}}</h2>
            <p>{{item.text}}</p>
            <div class="footer">
              <span class="iconfont icon-rili">&nbsp;{{item.time}}</span>
              <span>#{{item.name}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
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
      name: 'All'
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
