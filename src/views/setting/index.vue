<template>
  <div class="center-container">
    <h1 class="title">管理员信息</h1>
    <el-card class="box-card">
      <div v-for="o in 4" :key="o" class="text item">
        {{ o === 1 ? '姓名: 王岩周明庆赵德福' : o === 2 ? '注册时间: 2023-6-11 09:26' : o === 3 ? '管理员权限: 管理员' : '管理员ID: 8517' }}
      </div>
      <div class="text item">更换头像</div>
      <el-upload class="upload-button">
        <i class="el-icon-plus"></i>
        <div class="el-upload__text">点击上传图片</div>
      </el-upload>
    </el-card>
  </div>
</template>

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
    width: 900px; /* Increased width */
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
