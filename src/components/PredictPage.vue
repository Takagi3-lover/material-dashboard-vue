/**
* @Author 王宇轩
* @Date 2022年09月20日 21:20
* @Description
*/

<template>
  <div class="predictPage">
    <el-divider style="height: 1px"></el-divider>
    <el-steps :active="active" align-center finish-status="success">
      <el-step title="使用说明" icon="el-icon-bell"></el-step>
      <el-step title="上传文件" icon="el-icon-upload"></el-step>
      <el-step title="数据处理" icon="el-icon-s-promotion"></el-step>
      <el-step title="预测结果" icon="el-icon-s-opportunity"></el-step>
    </el-steps>
    <el-divider style="height: 1px"></el-divider>
    <div v-show="active===0">
      <div style="margin: 10px 0 10px 0">
        <!--        提示用户如何操作-->
        <div style="font-size: 16px;margin: 10px">-^0^-请按照以下步骤进行操作：</div>
        <div style="font-size: 16px;margin: 10px">1.请先下载模板文件，按照模板文件的格式填写数据</div>
        <div style="font-size: 16px;margin: 10px">2.点击上传文件按钮，上传文件</div>
        <div style="font-size: 16px;margin: 10px">3.点击数据处理按钮，进行数据处理</div>
        <div style="font-size: 16px;margin: 10px">4.点击预测结果按钮，查看预测结果</div>
      </div>
      <el-divider style="height: 1px"></el-divider>
      <div style="margin: 10px 0 10px 0">
        <el-button type="primary" @click="downloadTemplate">下载模板文件</el-button>
      </div>
    </div>
    <div v-show="active===1" style="display: flex;
            justify-content: center;
            align-items: center;">

      <div style="margin: 10px 0 10px 0">
        <el-upload
            ref="upload"
            class="upload-demo"
            drag
            :data="uploadData"
            :before-upload="beforeUpload"
            action="/api/uploadFile"
            :on-success="uploadFileSuccess">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传模板文件，且不超过500kb</div>
        </el-upload>
      </div>
    </div>
    <div v-show="active===2">
      <!--  此时后端正在处理上一步前端传回的数据，此页面提示用户当前的进度-->
      <div style="margin: 10px 0 10px 0">
        <el-progress type="circle" :percentage="progress" :stroke-width="6"></el-progress>
      </div>
      <!--     根据isProcessFinished参数，展示相关的提示性文字-->
      <div v-show="isProcessFinished===false" style="font-size: 16px;margin: 10px">数据处理中，请稍后...</div>
      <div v-show="isProcessFinished===true" style="font-size: 16px;margin: 10px">数据处理完成，请点击下一步</div>
    </div>
    <div v-show="active===3">
      <!-- 展示出上一步预测出的结果并显示比例图-->
      <div style="margin: 10px 0 10px 0">
        <el-divider style="height: 1px"></el-divider>
        <div style="font-size: 16px;margin: 10px">预测结果：</div>
        <div style="font-size: 16px;margin: 10px">正常：{{ normal }}</div>
        <div style="font-size: 16px;margin: 10px">异常：{{ abnormal }}</div>
        <el-divider style="height: 1px"></el-divider>
        <div style="margin: 10px 0 10px 0">
          <el-progress type="circle" :percentage="normal" :stroke-width="6"></el-progress>
          <el-progress type="circle" :percentage="abnormal" :stroke-width="6"></el-progress>
        </div>
      </div>


    </div>
    <el-divider style="height: 1px"></el-divider>
    <div style="margin: 10px 0 10px 0">
      <el-button @click="prev">上一步</el-button>
      <el-button type="primary" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PredictPage",
  data() {
    return {
      active: 1,
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      isProcessFinished: false,
      uploadData: null,
    }
  },
  methods: {
    uploadFileSuccess(response) {
      console.log(response);
      this.$message({
        message: '上传成功',
        type: 'success'
      });
    },
    downloadTemplate() {
      //获取用户头像
      this.request.post('/getFile', {
        username: '1621718895@qq.com',
      }).then(res => {
        console.log(res);
        if (res.code === 200) {
          console.log("success")
        }
      }).catch(err => {
        console.log(err);
      })
      this.$message({
        message: '下载成功',
        type: 'success'
      });
      this.next();
    },
    uploadFile() {
      this.$message({
        message: '上传成功',
        type: 'success'
      });
    },
    beforeUpload() {
      this.uploadData = {username: sessionStorage.getItem("email")};
      console.log(this.uploadData)
      return new Promise((resolve) => {
        this.$nextTick(function () {
          resolve(true);
        });
      }); //通过返回一个promis对象解决
    },
    dataProcess() {
      this.$message({
        message: '数据处理成功',
        type: 'success'
      });
    },
    next() {
      if (this.active++ > 3) this.active = 0;
      if (this.active === 1) {
        // this.$refs['upload'].clearFiles();
      }
    },
    prev() {
      if (this.active-- < 0) this.active = 3;
    }
  }
}
</script>

<style scoped>
.predictPage {
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  background-color: white;
}
</style>