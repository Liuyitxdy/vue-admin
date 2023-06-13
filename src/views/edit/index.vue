<template>
  <div>
    <div class="home">
      <div style="width:90%;margin: 0 auto;margin-top: 50px">

        <mavon-editor :codeStyle="codeStyle" :toolbars="toolbars" v-model.trim="content" :ishljs="true" ref="md" @change="change"/>

      </div>
    </div>
    <div class="btnbox">
<el-button @click="outputENter" class="btn">提交</el-button>
    </div>
      
  </div>

</template>

<script>
export default {
  data() {
    return {
      content: "",
      page_article:undefined,
      html_content:undefined,
      md_content:undefined,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: true, // 单双栏模式
        preview: true // 预览
      },
      codeStyle:'monokai-sublime',//主题
      test_html:undefined
    };
  },
  methods:{
    outputENter(){
    if(this.content != ''){
        this.$message.success('提交成功')
      this.$router.go(0)
    }else{
      this.$message.error("请输入文字")
    }
    },
    change(value, render){
      // render 为 markdown 解析后的结果
      this.test_html = render;
    }
  }
};
</script>
<style>
.btnbox{
  
  margin: 0 auto;
  width: 100px;
}
.btn{
  margin-top: 50px;
  text-align: center;
  background-color: #20a0ff;
  color: #ffffff;
}
.home{

  width: 75%;
  border: 1px #ccc solid;
  box-shadow: 5px 5px #cccccc;
  height: 390px;
  margin: 0 auto;
}
</style>

