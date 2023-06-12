<template>
  <div class="center-container">
    <h1 class="title">信息</h1>
    <el-card class="box-card">
      <div v-for="item in admin" :key="item.id" class="text item">
        <div>姓名：{{ item.adminName }}</div>
        <br />
        <div>注册日期：{{ item.adminReg }}</div>
        <br />
        <div>地址：{{ item.adminAdd }}</div>
        <br />
        <div>权限：{{ item.might }}</div>
      </div>
      <div class="text item">更换头像</div>
      <el-upload class="upload-button" action="/upload" :show-file-list="false">
        <i class="el-icon-plus"></i>
        <div class="el-upload__text">点击上传图片</div>
      </el-upload>
    </el-card>
  </div>
</template>

<script>
import http from "@/api/http.js";

export default {
  data() {
    return {
      admin: [],
    };
  },
  mounted() {
    http.get("/data.json").then((res) => {
      console.log(res.data.data.adminList);
      this.admin = res.data.data.adminList;
    }).catch((error) => {
      console.error(error);
    });
  },
};
</script>

<style>
.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 900px;
  position: relative;
}

.title {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  color: #656565cc;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.upload-button {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
}
</style>
