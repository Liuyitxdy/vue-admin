<template>
  <div>
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
          <el-button
            type="primary"
            size="mini"
            @click="dialogFormVisible = true"
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
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
          ></el-input> </el-form-item
        ><el-form-item label="店铺介绍" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
          ></el-input> </el-form-item
        ><el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺分类" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="快餐便当/简餐">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select> </el-form-item
        ><el-form-item label="商铺图片" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import http from "@/api/http.js";
export default {
  data() {
    return {
      businessList: [],
      showDia: false,
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
    };
  },
  mounted() {
    http.get("/data.json").then((res) => {
      console.log(res.data.data.busList);
      this.businessList = res.data.data.busList;
    });
  },
  methods: {
    showDialog() {
      console.log(111);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.businessList.splice(index, 1);
    },
  },
};
</script>

<style></style>
