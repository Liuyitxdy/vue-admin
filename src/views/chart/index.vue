<template>
  <div ref="chart" style="width: 1200px; height: 400px" class="chart"></div>
</template>

<script>
import * as echarts from "echarts";
import http from "@/api/http";

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
      userDisc: [],
    };
  },
  methods: {
    getData() {
      http
        .get("/data.json")
        .then((res) => {
          this.userDisc = res.data.data.userdisc;
          console.log(this.userDisc);
          this.updateChart();
        })
        .catch((error) => {
          console.log(error);
        });

      console.log(this.addUsers);
    },
    updateChart() {
      // 更新图表配置

      console.log(this.dates);
      const option = {
        title: {
          text: "用户分布",
          subtext: " ",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: this.userDisc.map((item) => {
              return {
                value: item.total,
                name: item.city,
              };
            }),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
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
