<template>
  <div class="app-container">
    <div style="border: 1px solid #ccc; padding-left: 33px" class="iupbox">
      食品种类
      <el-select v-model="value" placeholder="请选择" class="iunp">
        <el-option
          v-for="item in options"
          :key="item.name"
          :label="item.label"
          :value="item.info"
        >
        </el-option>
      </el-select>
    </div>

    <el-collapse v-model="activeName" accordion class="foodxz">
      <el-collapse-item title="添加食品种类" name="1" class="addFood">
        <div class="collForm">
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="Lb"
          >
            <el-form-item label="种类概况">
              <el-input v-model="Lb.name" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="种类名称">
              <el-input v-model="Lb.info" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitLb">立即创建</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>

    <div style="border: 1px solid #ccc; padding: 15px">
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
        <div v-show="ruleForm.radio == 1">
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
        </div>
        <div v-show="ruleForm.radio == 2">
          <el-form :model="formGg">
            <el-form-item label="规格" :label-width="formLabelWidth" required>
              <el-input
                v-model="formGg.name"
                autocomplete="off"
                maxlength="3"
                style="width: 28%"
              ></el-input>
            </el-form-item>
            <el-form-item label="包装费" :label-width="formLabelWidth">
              <el-input-number
                v-model="Bprice"
                @change="Bigprice"
                :min="0"
                label="包装费"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="价格" :label-width="formLabelWidth">
              <el-input-number
                v-model="Price"
                @change="TotalPrice"
                :min="0"
                label="价格"
              ></el-input-number>
            </el-form-item>
          </el-form>
        </div>
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
      show: true,
      showMore: false,
      Bprice: 0,
      Price: 0,
      formLabelWidth: "100px",
      formGg: {
        name: "",
      },
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
      labelPosition: "left",
      Lb: {
        name: "",
        info: "",
      },

      activeName: "",
      rules: {},
      radio: "",
      options: [
        {
          name: "选项1",
          info: "热销榜",
        },
        {
          name: "选项2",
          info: "推荐菜",
        },
        {
          name: "选项3",
          info: "火锅",
        },
        {
          name: "选项4",
          info: "龙须面",
        },
        {
          name: "选项5",
          info: "北京烤鸭",
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
    Bigprice(value) {
      console.log(value);
    },
    TotalPrice(value) {
      console.log(value);
    },
    submitLb() {
      let arrLb = Array.of(this.Lb);
      arrLb.forEach((item) => {
        this.options.push(item);
      });
      this.$message.success("创建成功");
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
            // foodclassify: this.value,
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
.collForm {
  width: 80%;
  margin: 0 auto;
}
</style>
