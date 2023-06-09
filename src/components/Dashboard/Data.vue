<template>
  <div class="dashboard-statistics">
    <h2>数据统计</h2>
    <ul v-for="item in todayData" :key="item.id">
      <li class="ye">当日数据：</li>
      <li>
        <span>{{ item.addUser }}</span
        >新增用户
      </li>
      <li>
        <span>{{ item.addOrders }}</span
        >新增订单
      </li>
      <li>
        <span>{{ item.addAdmin }}</span
        >新增管理员
      </li>
      <li class="bl">总数据：</li>
      <li>
        <span>{{ item.regUser }}</span
        >注册用户
      </li>
      <li>
        <span>{{ item.orders }}</span
        >订单
      </li>
      <li>
        <span>{{ item.totalAdmin }}</span
        >管理员
      </li>
    </ul>
  </div>
</template>

<script>
import http from "@/api/http";
export default {
  data() {
    return {
      todayData: [],
    };
  },

  methods: {},

  mounted() {
    http
      .get("/data.json")
      .then((res) => {
        // 过滤数据
        this.todayData = res.data.data.dayData;
        // 过滤今天的日期
        this.todayData = this.todayData.filter((item) => {
          return item.date === "2023-06-09";
        });
        console.log(this.todayData);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style lang="scss">
.dashboard-statistics {
  font-size: 30px;
  line-height: 46px;
  text-align: center;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    width: 1200px;
    margin: 0 auto;

    li {
      width: 250px;
      margin: 10px;
      background-color: #e5e9f2;
      border-radius: 6px;
      font-size: 14px;
      color: #8f8f8f;
      span {
        font-size: 24px !important;
        font-weight: 400 !important;
        color: black;
      }
    }
    .ye {
      background-color: #ff9800;
      color: white;
      font-size: 24px !important;
    }
    .bl {
      background-color: #20a0ff;
      color: white;
      font-size: 24px !important;
    }
  }
}
</style>
