<template>
  <div class="app-container">
    <el-table :data="businessList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="店铺名称">
              <span>{{ props.row.shopName }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.shopAddress }}</span>
            </el-form-item>
            <el-form-item label="店铺介绍">
              <span>{{ props.row.shopIntroduce }}</span>
            </el-form-item>
            <el-form-item label="店铺ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.shopPhone }}</span>
            </el-form-item>
            <el-form-item label="评分">
              <span>{{ props.row.shopSc }}</span>
            </el-form-item>
            <el-form-item label="销售量">
              <span>{{ props.row.shopSales }}</span>
            </el-form-item>
            <el-form-item label="分类">
              <span>{{ props.row.shopClassify }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="shopName"></el-table-column>
      <el-table-column label="店铺地址" prop="shopAddress"> </el-table-column>
      <el-table-column label="店铺介绍" prop="shopIntroduce"> </el-table-column>
      <el-table-column label="操作" prop="desc">
        <template slot-scope="scope">
          <el-button  size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑
            </el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >添加食品</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination>
  </div>
</template>

<script>
import http from "@/api/http.js";
export default {
  name: "Home",
  data() {
    return {
      businessList: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        shopName: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },

  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.businessList.splice(index, 1);
    },
  },

  mounted() {
    http.get("/data.json").then((res) => {
      console.log(res.data.data.busList);
      this.businessList = res.data.data.busList;
    });
  },
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
