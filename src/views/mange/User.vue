<template>
  <div>
    <el-table :data="displayedUserList" style="width: 100%">
      <el-table-column
        prop="id"
        label="#"
        align="center"
        width="180"
        :cell-style="{ 'margin-left': '50px' }"
      ></el-table-column>
      <el-table-column
        prop="register"
        label="注册日期"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="userName"
        label="用户姓名"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="address"
        label="注册地址"
        align="center"
      ></el-table-column>
    </el-table>
    <pagination
      :current-page.sync="currentPage1"
      :total="totalItems"
      :page-size="pageSize"
      @page-change="handlePageChange"
    ></pagination>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination.vue";
import http from "@/api/http.js";

export default {
  name: "Home",
  components: {
    Pagination,
  },
  data() {
    return {
      userList: [],
      currentPage1: 1,
      pageSize: 10,
      totalItems: 0,
    };
  },
  computed: {
    displayedUserList() {
      const startIndex = (this.currentPage1 - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.userList.slice(startIndex, endIndex);
    },
  },
  methods: {
    handlePageChange(page) {
      this.currentPage1 = page;
    },
    fetchData() {
      http.get("/data.json").then((res) => {
        console.log(res.data.data.userList);
        this.userList = res.data.data.userList;
        this.totalItems = this.userList.length;
      });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
.text-container {
  margin-right: 10px;
}
</style>
