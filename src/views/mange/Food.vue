<template>

  <div>
    <!-- 订单 -->
    <el-table
    :data="foodstuffList"
    style="width:100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="食品名称" align="center">
            <span>{{ props.row.foodstuffinName}}</span>
          </el-form-item>
          <el-form-item label="餐馆名称" align="center">
            <span>{{ props.row.restaurantname }}</span>
          </el-form-item>
          <el-form-item label="食品ID" align="center">
            <span>{{ props.row.foodstuffid }}</span>
          </el-form-item>
          <el-form-item label="餐馆 ID" align="center">
            <span>{{ props.row.foodstuffid }}</span>
          </el-form-item>
          <el-form-item label="食品介绍" align="center">
            <span></span>
          </el-form-item>
          <el-form-item label="餐馆地址" align="center">
            <span>{{ props.row.restaurantAddress }}</span>
          </el-form-item>
           <el-form-item label="食品评分" align="center">
            <span>{{ props.row.foodstuffSc }}</span>
          </el-form-item>
          <el-form-item label="食品分类" align="center">
            <span>{{ props.row.foodstuffclassify }}</span>
          </el-form-item>
           <el-form-item label="月销量" align="center">
            <span>{{ props.row.foodstuffSales }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="食品名称"
      prop="foodstuffinName" align="center">
    </el-table-column>
    <el-table-column
      label="食品介绍"
      prop="pricrsum" align="center">
    </el-table-column>
    <el-table-column
      label="评分"
      prop="foodstuffSc" align="center">
    </el-table-column>
     <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row, )">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

 
  </div>
</template>

<script>
import http from "@/api/http.js";

export default {
 data(){
  return{
    foodstuffList:[]
  }
 },
 mounted(){
  http.get("/data.json").then((res) => {
      console.log(res.data.data.foodList);
      this.foodstuffList = res.data.data.foodList
    });
  },
  methods: {
      handleEdit(index, row) {
        console.log(scope.props);
        
      },
      handleDelete(index, row) {
        
        this.foodstuffList.splice(index,1)
      }
    }
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
  el-table-column{
    background-color: #eef0f5 !important;
  }
</style>