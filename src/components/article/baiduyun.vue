<template>
  <div class="main">
    <img src="../../assets/Imgs/nav01.jpg" />
    <div class="container">
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <ul class="title">
            <li>
              <span class="highlight">CSS动画</span>
            </li>
          </ul>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-card class="animationRow" v-for="(item, index) in content" :key="index">
          <el-row :gutter="50">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <img style="width:100%;height:100%;display:block;"  v-lazy="item.imgsrc"/>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <h1>{{item.headertext}}</h1>
              <span>{{item.text}}</span>
              <div class="jiantou">
                <a :href="item.linksrc">
                  <span slot="reference" class="iconfont icon-jiantou"></span>
                </a>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-row>
      <el-row :gutter="50">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-pagination
            style="display:block"
            class="disappear"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="pageSize"
            :pagerCount="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
          <el-pagination
            style="display:none"
            class="appear"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 2, 5, 10]"
            :page-size="pageSize"
            :pagerCount="5"
            layout="total, prev, pager, next"
            :total="total"
          ></el-pagination>
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
      // 控制li高亮
      id: 0,
      // 获取到的内容
      content: null,
      // 获取用户列表的参数对象
      currentPage: 1, // 当前页
      total: 0, // 数据总条数
      pageSize: 5 // 每页条数
    }
  },
  methods: {
    // 分页
    getAccountListByPage() {
      // 收集当前页码 和 每页显示条数
      const pageSize = this.pageSize
      const currentPage = this.currentPage
      this.axios
        .get('api/css', {
          params: {
            pageSize,
            currentPage
          }
        })
        .then(response => {
          const { total, data } = response.data
          // 赋值给对应的变量即可
          this.total = total
          this.content = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 每页显示条数改变 就会触发这个函数
    handleSizeChange(val) {
      // 保存每页显示的条数
      this.pageSize = val
      // 调用分页函数
      this.getAccountListByPage()
    },
    // 当前页码改变 就会触发这个函数
    handleCurrentChange(val) {
      // 保存当前页码
      this.currentPage = val
      // 调用分页函数
      this.getAccountListByPage()
    }
  },
  mounted() {
    // this.postcomment()
    this.getAccountListByPage()
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/CSS/article/baiduyun.less';
</style>
