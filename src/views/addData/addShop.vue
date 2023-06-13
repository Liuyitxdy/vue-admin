<template>
  <div class="app-container">
    <div style="border: 1px solid #ccc; padding-left: 33px" class="iupbox">
      食品种类
      <el-select v-model="value" placeholder="请选择" class="iunp">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <el-collapse v-model="activeName" accordion class="foodxz">
      <el-collapse-item title="添加食品种类" name="1" class="addFood">
        <div class="radio-el">
          <el-radio
            :label="index"
            border
            disabled
            v-for="(item, index) in options"
            :key="index"
            >{{ item.label }}</el-radio
          >
        </div>
      </el-collapse-item>
    </el-collapse>

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
          <el-input v-model="ruleForm.name" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="食品活动" prop="active">
          <el-input v-model="ruleForm.active" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="食品详情" prop="info">
          <el-input v-model="ruleForm.info" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item label="食品特点" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择">
            <el-option label="特点一" value="shanghai"></el-option>
            <el-option label="特点二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="食品规格" prop="radio">
          <el-radio-group v-model="ruleForm.radio">
            <el-radio :label="1">默认</el-radio>
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
        active: "",
        region: "",
        radio: 1,
        sc: 4.8,
        psf: 0,
        qsj: 0,
      },

      activeName: "",
      rules: {},
      radio: "",
      options: [
        {
          value: "选项1",
          label: "热销榜",
        },
        {
          value: "选项2",
          label: "推荐菜",
        },
        {
          value: "选项3",
          label: "火锅",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",

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
          if (this.ruleForm.radio == 1) {
            this.ruleForm.radio = "单规格";
          } else {
            this.ruleForm.radio = "多规格";
          }
          const shopsData = {
            foodsnm: this.ruleForm.name,
            foodsinfo: this.ruleForm.info,
            // foodActive: this.ruleForm.active,
            region: this.ruleForm.region,
            gg: this.ruleForm.radio,
            foodstuffSc: this.ruleForm.sc,
            foodclassify: this.value,
            bigprice: this.ruleForm.psf,
            price: this.ruleForm.qsj,
          };
          localStorage.setItem("shopsData", JSON.stringify(shopsData));

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
.foodxz {
  margin-bottom: 50px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
.iunp {
  width: 600px;
  padding-top: 20px;
}
.iupbox {
  height: 100px;
}
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

.addFood {
  padding: 15px;
  width: 100%;
  margin: 0 auto;
}
.radio-el {
  display: flex;
}
</style>
