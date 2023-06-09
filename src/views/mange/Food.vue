<template>
  <div>
    <!-- 订单 -->
    <el-table :data="foodstuffList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
<<<<<<< HEAD
            <el-form-item label="食品名称" align="center">
              <span>{{ props.row.foodstuffinName }}</span>
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
              <span>{{ props.row.foodsp }}</span>
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
=======
            <el-form-item label="食品名称">
              <span>{{ props.row.foodstuffinName }}</span>
            </el-form-item>
            <el-form-item label="餐馆名称">
              <span>{{ props.row.restaurantname }}</span>
            </el-form-item>
            <el-form-item label="食品ID">
              <span>{{ props.row.foodstuffid }}</span>
            </el-form-item>
            <el-form-item label="餐馆 ID">
              <span>{{ props.row.foodstuffid }}</span>
            </el-form-item>
            <el-form-item label="食品介绍">
              <span>{{ props.row.restaurantjs }}</span>
            </el-form-item>
            <el-form-item label="餐馆地址">
              <span>{{ props.row.restaurantAddress }}</span>
            </el-form-item>
            <el-form-item label="食品评分">
              <span>{{ props.row.foodstuffSc }}</span>
            </el-form-item>
            <el-form-item label="食品分类">
              <span>{{ props.row.foodstuffclassify }}</span>
            </el-form-item>
            <el-form-item label="月销量">
>>>>>>> 33fffab427cfaba7da2e4cd968806500db63d815
              <span>{{ props.row.foodstuffSales }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
<<<<<<< HEAD
      <el-table-column label="食品名称" prop="foodstuffinName" align="center">
      </el-table-column>
      <el-table-column label="食品介绍" prop="pricrsum" align="center">
      </el-table-column>
      <el-table-column label="评分" prop="foodstuffSc" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            <span type="text" @click="dialogFormVisible = true">编辑</span>
            <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
              <el-form :model="foodstuffList">
                <el-form-item label="食品名称" :label-width="formLabelWidth">
                  <el-input v-model="scope.row.foodstuffinName" autocomplete="off"></el-input>
                </el-form-item>
               <el-form-item label="食品介绍" :label-width="formLabelWidth">
                  <el-input v-model="scope.row.foodsp" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false"
                  >确 定</el-button
                >
              </div>
            </el-dialog>
          </el-button>
=======
      <el-table-column label="食品名称" prop="foodstuffinName">
      </el-table-column>
      <el-table-column label="食品介绍" prop="restaurantjs"> </el-table-column>
      <el-table-column label="评分" prop="foodstuffSc"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
>>>>>>> 33fffab427cfaba7da2e4cd968806500db63d815
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import http from "@/api/http.js";

export default {
  data() {
    return {
      foodstuffList: [],
<<<<<<< HEAD
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
=======
>>>>>>> 33fffab427cfaba7da2e4cd968806500db63d815
    };
  },
  mounted() {
    http.get("/data.json").then((res) => {
      console.log(res.data.data.foodList);
      this.foodstuffList = res.data.data.foodList;
    });
  },
  methods: {
    handleEdit(index, row) {
      console.log(scope.props);
    },
    handleDelete(index, row) {
      this.foodstuffList.splice(index, 1);
    },
  },
};
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
el-table-column {
  background-color: #eef0f5 !important;
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> 33fffab427cfaba7da2e4cd968806500db63d815
