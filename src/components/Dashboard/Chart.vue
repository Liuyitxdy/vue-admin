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
          text: "走势图",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["新注册用户", "新增订单", "新增管理员"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          show: true,
          feature: {
            // dataZoom: {
            //   yAxisIndex: "none",
            // },
            // dataView: {
            //   readOnly: false,
            // },
            magicType: {
              //配置可以动态切换的类型：
              type: ["line", "bar"],
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.dates,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "新注册用户",
            type: "line",
            data: this.addUsers,
          },
          {
            name: "新增订单",
            type: "line",
            stack: "Total",
            data: this.addOrders,
          },
          {
            name: "新增管理员",
            type: "line",
            stack: "Total",
            data: this.addAdmin,
          },
        ],
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
