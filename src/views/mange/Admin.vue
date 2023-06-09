<template>
  <div>
    <!-- 管理员 -->
    <el-table
      :data="anminlist"
      style="width: 100%">
      <el-table-column
        prop="administratorName"
        label="姓名"
        width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="dateOfRegistration"
        label="日期"
        width="180" align="center">
      </el-table-column>
      <el-table-column
        prop="administratorAddress"
        label="地址" align="center">
      </el-table-column>
      <el-table-column
        prop="might"
        label="管理员" align="center"
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import http from "@/api/http.js";

export default {
 data(){
  return{
    anminlist:[]
  }
 },
 mounted(){
  http.get("/data.json").then((res) => {
      console.log(res.data.data.adminiList);
      this.anminlist = res.data.data.adminiList
    });
  },
 }
</script>

<style lang="less" scoped>



</style>