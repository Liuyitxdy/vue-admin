<template>
  <div>
    <!-- 订单 -->
    <el-table :data="displayedFoodList" style="width: 100%; text-align: center">
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
              <span>{{ props.row.foodclassify }}</span>
            </el-form-item>
            <el-form-item label="月销量">
              <span>{{ props.row.foodsSales }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="食品名称" prop="foodsnm"> </el-table-column>
      <el-table-column label="食品介绍" prop="foodsp"> </el-table-column>
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
          <el-input v-model="form.foodsnm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="食品介绍" :label-width="formLabelWidth">
          <el-input v-model="form.foodsinfo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="食品分类" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="热销榜">
            <el-option
              :label="item"
              :value="item"
              v-for="(item, index) in foodsclassify"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="食品图片" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 添加规格 -->
    <el-dialog title="添加规格" :visible.sync="dialogFormVisible1">
      <el-form :model="form">
        <el-form-item label="规格" :label-width="formLabelWidth" required>
          <el-input v-model="form.name" autocomplete="off"></el-input>
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveGg">确 定</el-button>
      </div>
    </el-dialog>
    <pagination
      :current-page.sync="currentPage1"
      :total="totalItems"
      :page-size="pageSize"
      @page-change="handlePageChange"
    ></pagination>
  </div>
</template>

<script>
import http from "@/api/http.js";
import Pagination from "@/components/Pagination.vue";

export default {
  data() {
    return {
      foodstuffList: [],
      currentPage1: 1,
      pageSize: 10,
      totalItems: 0,
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisiblea: false,
      dialogFormVisible1: false,
      formLabelWidth: "120px",
      form: [],
      list: [],
      foodsp: "",
      foodsclassify: [],
      bigprice: 0,
      price: 0,
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
  },
  methods: {
    handleEdit(index, row) {
      this.tableData = Array.of(row);
      this.form = row;
      let list = this.tableData;
      this.list = list.map((item) => item.foodsp);
      // list转换字符串
      this.foodsp = this.list.join(",");
      this.dialogFormVisible = true;
      // 把foodstuffList中重复的foodclassify数据去掉赋值给foodsclassify数组中
      this.foodsclassify = this.foodstuffList
        .map((item) => item.foodclassify)
        .filter((item, index, arr) => {
          return arr.indexOf(item) === index;
        });
    },
    handleDelete(index, row) {
      this.foodstuffList.splice(index, 1);
    },
    handleDelete1(index, row) {
      this.tableData.splice(index, 1);
    },
    handlePageChange(page) {
      this.currentPage1 = page;
    },
    fetchData() {
      http.get("/data.json").then((res) => {
        this.foodstuffList = res.data.data.foodList;
        this.totalItems = this.foodstuffList.length;
      });
    },
    handleChange(value) {
      console.log(value);
    },
    handleChange1(value) {
      console.log(value);
    },

    // 保存规格
    saveGg() {
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
</style>
