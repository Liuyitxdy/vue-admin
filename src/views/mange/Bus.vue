<template>
  <div class="app-container">
    <el-table
      :data="displayedBusinessList"
      style="width: 100%"
      :header-cell-style="{ background: '#f4f3f9', color: '#606266' }"
      :border="true"
    >
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
      <el-table-column
        label="店铺名称"
        prop="shopName"
        align="center"
      ></el-table-column>
      <el-table-column label="店铺地址" prop="shopAddress" align="center">
      </el-table-column>
      <el-table-column label="店铺介绍" prop="shopIntroduce" align="center">
      </el-table-column>

      <el-table-column label="操作" prop="desc">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="showEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
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
    <el-dialog title="修改店铺信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="店铺名称" :label-width="formLabelWidth">
          <el-input
            v-model="form.shopName"
            autocomplete="off"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input
            v-model="form.shopAddress"
            autocomplete="off"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="店铺介绍" :label-width="formLabelWidth">
          <el-input
            v-model="form.shopIntroduce"
            autocomplete="off"
            maxlength="30"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input
            v-model="form.shopPhone"
            autocomplete="off"
            maxlength="11"
            minlength="11"
          ></el-input>
        </el-form-item>
        <el-form-item label="店铺分类" :label-width="formLabelWidth">
          <el-select v-model="form.shopClassify" placeholder="快餐便当/简餐">
            <el-option label="区域一" value="快餐便当"></el-option>
            <el-option label="区域二" value="简餐"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商铺图片" :label-width="formLabelWidth">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="updateForm">确定</el-button>
      </div>
    </el-dialog>

    <div class="kongzhi-container">
      <span class="pagination-info">共 {{ totalItems }} 条</span>
      <pagination
        :current-page.sync="currentPage"
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
  name: "Home",
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalItems: 0,
      businessList: [],
      showDia: false,
      editedItem: null,
      dialogTableVisible: false,
      dialogFormVisible: false,
      localStorageData: [],
      form: {
        shopName: "",
        shopAddress: "",
        shopIntroduce: "",
        shopPhone: "",
        shopClassify: "",
        shopClassifyItem: "",
        shopImage: "无",
      },
      formLabelWidth: "120px",
    };
  },
  components: { Pagination },
  computed: {
    displayedBusinessList() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.businessList.slice(startIndex, endIndex);
    },
  },
  mounted() {
    // this.localStorageData = JSON.parse(localStorage.getItem("shopData"));
    // console.log(this.localStorageData);
    this.fetchData();
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchData();
    },
    showEdit(index, row) {
      this.editedItem = { ...row };
      this.form = { ...row };
      this.dialogFormVisible = true;
    },
    updateForm() {
      // 根据 this.editedItem.id 找到对应的项
      const index = this.businessList.findIndex(
        (item) => item.id === this.editedItem.id
      );
      if (index !== -1) {
        // 更新对应项的数据
        this.businessList[index].shopName = this.form.shopName;
        this.businessList[index].shopAddress = this.form.shopAddress;
        this.businessList[index].shopIntroduce = this.form.shopIntroduce;
        this.businessList[index].shopPhone = this.form.shopPhone;
        this.businessList[index].shopClassify = this.form.shopClassify;
        this.businessList[index].shopImage = this.form.shopImage;
        // 关闭对话框
        this.dialogFormVisible = false;
      }
    },

    fetchData() {
      http.get("/data.json").then((res) => {
        this.businessList = res.data.data.busList;
        this.form = this.businessList;
        this.totalItems = this.businessList.length;

        if (localStorage.getItem("shopData")) {
          this.localStorageData = JSON.parse(localStorage.getItem("shopData"));

          // 合并数组对象
          let arr = [this.localStorageData, ...this.businessList];
          console.log(arr);
          this.businessList = arr;
        }
      });
    },

    handleDelete(index, row) {
      console.log(index, row);
      this.businessList.splice(index, 1);
      if (localStorage.getItem("shopData")) {
        localStorage.removeItem("shopData");
      }
      this.totalItems--;
      if (this.currentPage > Math.ceil(this.totalItems / this.pageSize)) {
        this.currentPage--;
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.dialogTableVisible = true;
      this.$router.push("/addData/addShop");
    },
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
