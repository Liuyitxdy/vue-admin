<template>
  <div class="app-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="ruleForm.address"></el-input>
        <div>当前城市：{{ ruleForm.nowCity }}</div>
      </el-form-item>

      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="店铺简介" prop="info">
        <el-input v-model="ruleForm.info"></el-input>
      </el-form-item>
      <el-form-item label="店铺标语" prop="by">
        <el-input v-model="ruleForm.by"></el-input>
      </el-form-item>
      <el-form-item label="店铺分类" prop="region">
        <el-select v-model="ruleForm.region" placeholder="快餐便当/简餐">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="营业时间">
        <el-time-picker
          v-model="value1"
          :picker-options="{
            selectableRange: '18:30:00 - 20:30:00',
          }"
          placeholder="任意时间点"
        >
        </el-time-picker>
        <el-time-picker
          arrow-control
          v-model="value2"
          :picker-options="{
            selectableRange: '18:30:00 - 20:30:00',
          }"
          placeholder="任意时间点"
        >
        </el-time-picker
      ></el-form-item>
      <el-form-item label="店铺特点" prop="delivery">
        品牌保证<el-switch v-model="ruleForm.delivery.ppbz"></el-switch>
        蜂鸟转送<el-switch v-model="ruleForm.delivery.fnks"></el-switch>
        新开店铺<el-switch v-model="ruleForm.delivery.xkdp"></el-switch><br />
        外卖保<el-switch v-model="ruleForm.delivery.wmb"></el-switch>
        准时达<el-switch v-model="ruleForm.delivery.zsd"></el-switch>
        开发票<el-switch v-model="ruleForm.delivery.kfp"></el-switch>
      </el-form-item>

      <el-form-item label="配送费" prop="psf">
        <el-input-number
          v-model="psf"
          @change="handleChange"
          :min="1"
          label="配送费"
        ></el-input-number> </el-form-item
      ><el-form-item label="起送价" prop="psf">
        <el-input-number
          v-model="qsj"
          @change="handleChange"
          :min="1"
          label="起送价"
        ></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: new Date(2023, 6, 11, 6),
      value2: new Date(2024, 1, 1, 20),
      ruleForm: {
        name: "",
        date1: "",
        date2: "",
        delivery: {
          ppbz: false,
          fnks: false,
          xkdp: false,
          wmb: false,
          zsd: false,
          kfp: false,
        },
        address: "",
        phone: "",
        info: "",
        by: "",
        nowCity: "成都",
        psf: "",
      },
      psf: 4.5,
      qsj: 20,
      time: "",
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" },
        ],
      },
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 800px;
  margin: 0 auto;
}
</style>
