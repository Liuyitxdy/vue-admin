<template>
  <div class="app-container">
    <mange-list></mange-list>
    <div></div>
    <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination>
  </div>
</template>

<script>
import mangeList from "@/components/Mange/Bus/List";
export default {
  name: "Home",
  data() {
    return {};
  },
  components: { mangeList },
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
