<template>
  <div class="app-container">
    <div style="border: 1px solid #ccc">
      <h3 class="tianjiasp">添加商品</h3>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="name" :rules="nameRules" required>
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="食品活动" prop="info">
          <el-input v-model="ruleForm.info"></el-input>
        </el-form-item>
        <el-form-item label="食品详情" prop="info">
          <el-input v-model="ruleForm.info"></el-input>
        </el-form-item>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
        <el-form-item label="食品特点" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择">
            <el-option label="特点一" value="shanghai"></el-option>
            <el-option label="特点二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="食品规格" prop="radio">
          <el-radio-group v-model="ruleForm.radio">
            <el-radio :label="1">单规格</el-radio>
            <el-radio :label="2">多规格</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="包装费" prop="psf">
          <el-input-number
            v-model="ruleForm.psf"
            @change="handleChange"
            :min="1"
            label="包装费"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="价格" prop="qsj">
          <el-input-number
            v-model="ruleForm.qsj"
            @change="handleChange"
            :min="1"
            label="价格"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">
            确定添加商品
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        info: "",
        region: "",
        radio: "",
        psf: 1,
        qsj: 20,
      },
      dialogVisible: false,
      dialogImageUrl: "",
      nameRules: [
        { required: true, message: "请输入商品名称", trigger: "blur" },
      ],
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: "创建成功",
            type: "success",
          });
          this.$router.go(0);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.tianjiasp {
  text-align: center;
  color: rgb(45, 45, 45);
  margin-bottom: 20px;
  border-bottom: none;
  padding-bottom: 10px;
}

.el-form-item.required .el-form-item__label:before {
  content: "*";
  color: red;
}

.top-line {
  height: 3px;
  width: 100%;
  background-color: #000;
}

.outer-container {
  width: 800px;
  margin: 0 auto;
  border: 1px solid #b7b4b4;
  padding: 20px;
}

.category-container {
  display: flex;
  align-items: center;
}

.category-left {
  flex: 1;
}

.category-right {
  flex: 1;
  text-align: right;
}

.add-category-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.add-category-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: #ccc;
  margin-right: 10px;
}

.add-category-text {
  flex: 1;
}

.app-container {
  /* 原有的样式 */
}
</style>
