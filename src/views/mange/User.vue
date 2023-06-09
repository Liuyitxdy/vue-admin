<template>
  <div>
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="id" label="#" align="center" width="180" :cell-style="{ 'margin-left': '50px' }"></el-table-column>
      <el-table-column prop="register" label="注册日期" width="180"></el-table-column>
      <el-table-column prop="userName" label="用户姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="注册地址" align="center"></el-table-column>
    </el-table>
    <div class="pagination-container">
      <div class="text-container">共7596条</div>
      <el-pagination background :current-page.sync="currentPage1" :total="7596" layout="prev, pager, next"></el-pagination>
    </div>
  </div>
</template>

<script>
import http from "@/api/http.js";
export default {
  name: "Home",
  data() {
    return {
      userList: [],
      currentPage1: 1
    };
  },
  methods: {},
  mounted() {
    http.get("/data.json").then((res) => {
      console.log(res.data.data.userList);
      this.userList = res.data.data.userList;
    });
  },
};
</script>

<style>
.pagination-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.text-container {
  margin-right: 10px;
}
</style>