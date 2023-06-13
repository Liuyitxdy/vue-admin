<template>
  <div>
    <!-- 订单 -->
    <el-table
      :data="displayedFoodList"
      style="width: 100%; text-align: center"
      :border="true"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="食品名称">
              <span>{{ props.row.foodsnm }}</span>
            </el-form-item>
            <el-form-item label="餐馆名称">
              <span>{{ props.row.restauName }}</span>
            </el-form-item>
            <el-form-item label="食品ID">
              <span>{{ props.row.foodsId }}</span>
            </el-form-item>
            <el-form-item label="餐馆 ID">
              <span>{{ props.row.restaurantid }}</span>
            </el-form-item>
            <el-form-item label="食品介绍">
              <span>{{ props.row.foodsinfo }}</span>
            </el-form-item>
            <el-form-item label="餐馆地址">
              <span>{{ props.row.restaAdd }}</span>
            </el-form-item>
            <el-form-item label="食品评分">
              <span>{{ props.row.foodstuffSc }}</span>
            </el-form-item>
            <el-form-item label="食品分类">
              <span>{{ props.row.region }}</span>
            </el-form-item>
            <el-form-item label="月销量">
              <span>{{ props.row.foodsSales }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="食品名称" prop="foodsnm"> </el-table-column>
      <el-table-column label="食品介绍" prop="foodsinfo"> </el-table-column>
      <el-table-column label="评分" prop="foodstuffSc"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>

          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改食品信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="食品名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.foodsnm"
            autocomplete="off"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="食品介绍" :label-width="formLabelWidth">
          <el-input
            v-model="form.foodsinfo"
            autocomplete="off"
            maxlength="30"
          ></el-input>
        </el-form-item>
        <el-form-item label="食品分类" :label-width="formLabelWidth">
          <el-select v-model="form.foodclassify" placeholder="热销榜">
            <el-option
              :label="item"
              :value="item"
              v-for="(item, index) in foodsclassify"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="食品图片" :label-width="formLabelWidth">
        </el-form-item>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="gg" label="规格" width="180">
          </el-table-column>
          <el-table-column prop="bigprice" label="包装费" width="180">
          </el-table-column>
          <el-table-column prop="price" label="价格"> </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete1(scope.$index, scope.row)"
                >删除</el-button
              >
            </template></el-table-column
          >
        </el-table>

        <div style="text-align: center; margin-top: 10px">
          <el-button type="primary" @click="dialogFormVisible1 = true"
            >添加规格</el-button
          >
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFoodInfo">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 添加规格 -->
    <el-dialog title="添加规格" :visible.sync="dialogFormVisible1">
      <el-form :model="form">
        <el-form-item label="规格" :label-width="formLabelWidth" required>
          <el-input
            v-model="form.name"
            autocomplete="off"
            maxlength="3"
          ></el-input>
        </el-form-item>
        <el-form-item label="包装费" :label-width="formLabelWidth">
          <el-input-number
            v-model="bigprice"
            @change="handleChange"
            :min="0"
            label="包装费"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input-number
            v-model="price"
            @change="handleChange1"
            :min="0"
            label="价格"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="upDatalist">确 定</el-button>
      </div>
    </el-dialog>
    <div class="kongzhi-container">
      <span class="pagination-info">共 {{ totalItems }} 条</span>
      <pagination
        :current-page.sync="currentPage1"
        :total="totalItems"
        :page-size="pageSize"
        @page-change="handlePageChange"
        class="kongzhi"
      ></pagination>
    </div>
  </div>
</template>

<script>
import http from "@/api/http.js";
import Pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      foodstuffList: [],
      editedItem: null,
      currentPage1: 1,
      pageSize: 10,
      totalItems: 0,
      tableData: [],
      localStorageData: [],

      dialogFormVisible: false,
      dialogFormVisiblea: false,
      dialogFormVisible1: false,
      formLabelWidth: "120px",
      form: {
        foodsnm: "",
        foodsinfo: "",
        region: "",
        name: "",

      },
      list: [],

      foodsclassify: [],
      bigprice: 0,
      price: 0,
      gg: "",
    };
  },
  components: {
    Pagination,
  },
  computed: {
    displayedFoodList() {
      const startIndex = (this.currentPage1 - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.foodstuffList.slice(startIndex, endIndex);
    },
  },
  mounted() {
    this.fetchData();
    console.log(localStorage);
  },
  methods: {
    handleEdit(index, row) {
      this.editedItem = { ...row };
      this.form = { ...row };
      this.tableData = Array.of(row);
      this.form.foodsnm = row.foodsnm;
      this.form.foodsinfo = row.foodsinfo;
      this.form.region = row.foodclassify;
      this.dialogFormVisible = true;
      // 把foodstuffList中重复的foodclassify数据去掉赋值给foodsclassify数组中;

      // this.foodsclassify = this.foodstuffList
      //   .map((item) => item.foodclassify)
      //   .filter((item, index, arr) => {
      //     return arr.indexOf(item) === index;
      //   });
    },
    handleDelete(index, row) {
      this.foodstuffList.splice(index, 1);
      this.totalItems--;
      if (this.currentPage > Math.ceil(this.totalItems / this.pageSize)) {
        this.currentPage--;
      }
    },
    handleDelete1(index, row) {
      this.tableData.splice(index, 1);
      window.localStorage.removeItem("shopData");
    },
    handlePageChange(page) {
      this.currentPage1 = page;
    },
    fetchData() {
      http.get("/data.json").then((res) => {
        this.foodstuffList = res.data.data.foodList;
        this.totalItems = this.foodstuffList.length;

        this.localStorageData = JSON.parse(localStorage.getItem("shopsData"));

        // 合并数组对象
        let arr = [this.localStorageData, ...this.foodstuffList];

        let tableData = [this.localStorageData, ...this.tableData];
        this.foodstuffList = arr;
        this.tableData = tableData;
        console.log(this.foodstuffList);
      });
    },
    handleChange(value) {
      console.log(value);
    },
    handleChange1(value) {
      console.log(value);
    },

    // 保存规格
    editFoodInfo() {
      this.dialogFormVisible1 = false;
      console.log(this.form); // 根据 this.editedItem.id 找到对应的项
      const index = this.foodstuffList.findIndex(
        (item) => item.id === this.editedItem.id
      );
      if (index !== -1) {
        // 更新对应项的数据
        this.foodstuffList[index].foodsnm = this.form.foodsnm;
        this.foodstuffList[index].foodsinfo = this.form.foodsinfo;
        this.foodstuffList[index].region = this.form.region;
        this.foodstuffList[index].name = this.form.name;
        // 关闭对话框
        this.dialogFormVisible = false;
      }
    },
    upDatalist() {
      this.dialogFormVisible1 = false;

      this.tableData.push({
        gg: this.form.name,
        bigprice: this.bigprice,
        price: this.price,
      });
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

.kongzhi-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.pagination-info {
  padding-left: 20px;
  color: #606266;
}
.kongzhi {
  margin-left: 10px;
}
</style>
