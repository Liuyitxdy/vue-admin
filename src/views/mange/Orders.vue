<template>

  <div>
    <!-- 订单 -->
    <el-table
    :data="ordersList"
    style="width:100%"
    :header-cell-style="{ background: '#f4f3f9', color: '#606266' }"
      :border="true">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="用户名">
            <span>{{ props.row.name}}</span>
          </el-form-item>
          <el-form-item label="店铺名称">
            <span>{{ props.row.shopname }}</span>
          </el-form-item>
          <el-form-item label="收货地址">
            <span>{{ props.row.shopdz }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopid }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.receiptdz }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="订单 ID"
      prop="ordersid" align="center">
    </el-table-column>
    <el-table-column
      label="总价格"
      prop="pricrsum" align="center">
    </el-table-column>
    <el-table-column
      label="订单状态"
      prop="orderstatus" align="center">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import http from "@/api/http.js";

export default {
 data(){
  return{
    ordersList:[]
  }
 },
 mounted(){
  http.get("/data.json").then((res) => {
      console.log(res.data.data.ordersList);
      this.ordersList = res.data.data.ordersList
    });
  },
 }
</script>

<style lang="css" scoped>
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