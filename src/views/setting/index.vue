<template>
  <div class="center-container">
    <div class="title">管理员信息</div>
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
      <div class="demo-image__preview">
        <el-image
          style="width: 100px; height: 100px"
          :src="url"
          :preview-src-list="srcList"
        >
        </el-image>
      </div>
    </el-card>
  </div>
</template>

<script>
import http from "@/api/http.js";

export default {
  data() {
    return {
      admin: [],

      url: "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      srcList: [
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg",
      ],
    };
  },
  mounted() {
    http
      .get("/data.json")
      .then((res) => {
        console.log(res.data.data.adminList);
        this.admin = res.data.data.adminList;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style>
.center-container {
  width: 80%;
  margin: 0 auto;
  height: 50vh;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.title {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  color: #656565cc;
  width: 80%; /* 使用百分比来设置宽度 */
  margin: 0 auto 20px;
}
.upload-button {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
}
</style>
