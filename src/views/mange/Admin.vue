<template>
  <div>
    <!-- 管理员 -->
    <el-table :data="adminList" style="width: 100%">
      <el-table-column prop="id" label="id" width="180" class=".txa">
      </el-table-column>
      <el-table-column prop="adminName" label="姓名" width="180" class=".txa">
      </el-table-column>
      <el-table-column prop="adminReg" label="日期" width="180" class=".txa">
      </el-table-column>
      <el-table-column prop="adminAdd" label="地址" class=".txa">
      </el-table-column>
      <el-table-column prop="might" label="管理员" class=".txa">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import http from "@/api/http.js";

export default {
  data() {
    return {
      adminList: [],
    };
  },
  mounted() {
    http.get("/data.json").then((res) => {
      console.log(res.data.data.adminList);
      this.adminList = res.data.data.adminList;
    });
  },
};
</script>

<style lang="scss" scoped>
.txa {
  text-align: center;
}
</style>
