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
            <el-col
              :xs="24"
              :sm="12"
              :md="12"
              :lg="12"
              :xl="12"
              class="hidden-md-and-down"
            >
              <div>
                <p>Tarrowtmo</p>
                <p>20岁</p>
                <p>学生</p>
                <p>喜欢乒乓球,ACG,听歌</p>
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
          <el-row :gutter="10" class="panel">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="panel bar" id="chart1">
                <h2>基础语言</h2>
                <div class="chart">图表</div>
                <div class="panel-footer"></div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="panel bar" id="chart2">
                <h2>框架掌握</h2>
                <div class="chart">图表</div>
                <div class="panel-footer"></div>
              </div>
            </el-col>
            <!-- <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="panel bar">
                <div class="chart">图表</div>
                <div class="panel-footer"></div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
              <div class="panel bar">
                <div class="chart">图表</div>
                <div class="panel-footer"></div>
              </div>
            </el-col> -->
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
  methods: {
    chartsImg() {
      var myColor = ['#2f89cf', '#F57474', '#56D0E3', '#F8B448', '#8B78F6']
      const myChart = this.$echarts.init(
        document.querySelector('#chart1 .chart')
      )
      const myChart2 = this.$echarts.init(
        document.querySelector('#chart2 .chart')
      )
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['HTML5', 'CSS3', 'JS', 'MySQL', 'ES6'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '达成度',
            type: 'bar',
            barWidth: '35%',
            data: [100, 80, 80, 60, 80],
            itemStyle: {
              // 修改柱子圆角
              barBorderRadius: 5
            }
          }
        ]
      }
      const option2 = {
        grid: {
          left: '4%',
          bottom: '10%',
          top: '10%',
          // 是否考虑刻度标签(axisLabel的宽度，即content-box和border-box)
          containLabel: true
        },
        xAxis: {
          show: false
        },
        yAxis: [
          {
            // 翻转
            inverse: true,
            show: true,
            type: 'category',
            data: ['JQuery', 'Vue', 'Node', 'Element-UI', 'React'],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#000'
            }
          },
          {
            show: true,
            type: 'category',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                fontSize: 12,
                color: '#fff'
              }
            }
          }
        ],
        series: [
          {
            name: '条',
            type: 'bar',
            data: [80, 95, 80, 97, 80],
            // 柱子之间的距离
            barCategoryGap: 50,
            // 柱子的宽度
            barWidth: 10,
            // 修改第一组柱子的圆角
            itemStyle: {
              barBorderRadius: 20,
              // params即为series对象
              color: function(params) {
                return myColor[params.dataIndex]
              }
            },
            // 显示柱子内的文字
            label: {
              show: true,
              position: 'inside',
              // {c}会自动解析数据data里的数据
              formatter: '{c}%'
            },
            yAxisIndex: 0
          },
          {
            name: '框',
            type: 'bar',
            data: [100, 100, 100, 100, 100],
            barCategoryGap: 50,
            barWidth: 15,
            itemStyle: {
              color: 'none',
              borderColor: '#00c1de',
              borderWidth: 3,
              barBorderRadius: 15
            },
            yAxisIndex: 1
          }
        ]
      }
      myChart.setOption(option)
      myChart2.setOption(option2)
      window.addEventListener('resize', function() {
        myChart.resize()
        myChart2.resize()
      })
    }
  },
  mounted() {
    this.chartsImg()
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/CSS/about/about.less';
</style>
