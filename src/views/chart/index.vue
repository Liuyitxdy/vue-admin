<template>
  <div ref="chart" style="width: 1200px; height: 400px" class="chart"></div>
</template>

<script>
import * as echarts from "echarts";
import http from "@/api/http";
import { toRaw } from "vue";

export default {
  mounted() {
    // 在组件挂载后，初始化 ECharts 实例，并设置配置项
    this.chart = echarts.init(this.$refs.chart);
    setTimeout(() => {
      this.updateChart();
    }, 1000);
    this.getData();
  },
  data() {
    return {
      dates: [],
      chartData: [],
      addUsers: [],
      addOrders: [],
      addAdmin: [],
    };
  },
  methods: {
    getData() {
      http
        .get("/data.json")
        .then((res) => {
          this.chartData = res.data.data.dayData;
          this.addUsers = [];
          this.chartData.forEach((item) => {
            this.addUsers.push(item.addUser);
            this.addOrders.push(item.addOrders);
            this.addAdmin.push(item.addAdmin);
          });
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(this.addUsers);
    },
    updateChart() {
      // 更新图表配置
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        this.dates.push(`${year}-${month}-${day}`);
      }
      console.log(this.dates);
      const option = {

            title: {
              text: '用户分布',
              subtext: ' ',
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left'
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: [
                  { value: 1048, name: '北京' },
                  { value: 735, name: '上海' },
                  { value: 580, name: '深圳' },
                  { value: 484, name: '成都' },
                  { value: 300, name: '其他' }
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };

          this.chart.setOption(option);
    },
  },
  beforeDestroy() {
    // 在组件销毁前销毁 ECharts 实例
    this.chart.dispose();
  },
};
</script>

<style lang="scss" scoped>
.chart {
  margin: 0 auto;
  margin-top: 50px;
}
</style>
