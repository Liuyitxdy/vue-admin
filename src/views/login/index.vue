<template>
  <div class="active">
    <div style="margin-top: 50px"><h2>elm后台管理系统</h2></div>

    <div class="box">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="username" class="username">
          <el-input
            type=""
            placeholder="用户名"
            v-model.trim="ruleForm.username"
            autocomplete="off"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" class="username">
          <!-- <el-input type="password" status-icon="false" placeholder="密码" v-model="ruleForm.checkPass"  maxlength="16" minlength="8"></el-input> -->
          <el-input
            placeholder="请输入密码"
            v-model.trim="ruleForm.password"
            show-password
            minlength="5"
            maxlength="16"
          ></el-input>
        </el-form-item>
        <el-form-item class="arrow">
          <!-- <el-button type="primary" @click="submitForm('ruleForm')" class="arrow">登录</el-button> -->
          <el-button
            class="arrow"
            type="primary"
            @click="submitForm('ruleForm')"
            :loading="loading"
            >登录</el-button
          >
        </el-form-item>
        <p style="text-align: center; color: red; font-size: 12px; margin: 0">
          温馨提示：
        </p>
        <P style="text-align: center; color: red; font-size: 9px; margin: 0"
          >未登录过的新用户，自动注册<br />主册过的用户可凭账号密码登亏</P
        >
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
        this.$notify.error({
          title: "错误",
          message: "请输入用户名",
        });
      } else {
        if (value.length < 3) {
          callback(new Error("用户名最少3位数"));
          this.$notify.error({
            title: "错误",
            message: "用户名长度不符合要求",
          });
        }
        callback();
      }
    };
    var checkPassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
        this.$notify.error({
          title: "错误",
          message: "请输入密码",
        });
      } else if (value.length < 6) {
        callback(new Error("密码最少6位数"));
        this.$notify.error({
          title: "错误",
          message: "密码长度不符合要求",
        });
      } else {
        callback();
      }
    };
    return {
      loading: false,
      ruleForm: {
        username: "",
        password: "",
      },
      input: "",
      rules: {
        username: [{ validator: checkUserName, trigger: "blur" }],
        password: [{ validator: checkPassWord, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.loading = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (
            this.ruleForm.username == "admin" &&
            this.ruleForm.password == "adminadmin"
          ) {
            setTimeout(() => {
              this.$message.success("登陆成功");
              this.$router.push("/");
              this.loading = false;
            }, 1000);
          } else {
            setTimeout(() => {
              this.$message.error("登陆失败，请检查用户名和密码");
              this.$notify.error({
                title: "错误",
                message: "请检查用户名或密码",
              });
              this.loading = false;
            }, 1000);
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style>
.active {
  background-color: #324057;
  height: 100%;
  padding: 1px;
  position: relative;
}
h2 {
  text-align: center;
  color: white;
  padding: 0;
  margin-top: 50px;
}
.box {
  position: relative;
  width: 400px;
  height: 253px;

  background-color: #ffffff;
  margin: 0 auto;
}
.demo-ruleForm {
  position: relative;
  top: 14px;
}
.username {
  width: 420px;
  margin-left: -60px;
}
.arrow {
  width: 320px;
  margin-left: -30px;
}
</style>
