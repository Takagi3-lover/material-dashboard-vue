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
        <a href="http://localhost:9090/getFile">
          <el-button type="primary" @click="downloadTemplate">下载模板文件</el-button>
        </a>
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
            :limit=1
            :on-success="uploadFileSuccess">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传模板文件</div>
        </el-upload>
      </div>
    </div>
    <div v-show="active===2">
      <!--  此时后端正在处理上一步前端传回的数据，此页面提示用户当前的进度-->
      <div style="margin: 10px 0 10px 0">
        <el-progress type="circle" :percentage="progress" :stroke-width="6"
                     :status="this.status"></el-progress>
      </div>
      <!--     根据isProcessFinished参数，展示相关的提示性文字-->
      <div v-show="isProcessFinished===false" style="font-size: 16px;margin: 10px">数据处理中，请稍后...</div>
      <div v-show="isProcessFinished===true" style="font-size: 16px;margin: 10px">数据处理完成，请点击下一步</div>
    </div>
    <div v-show="active===3">
      <!--      根据length的长度，生成对应行数的表格，表格有四列-->
      <div>
        <el-table
            :data="tableData"
            stripe
            style="width: 60%;margin: auto"
            max-height="350px">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="编号">
                  <span>{{ props.row.numbering }}</span>
                </el-form-item>
                <el-form-item label="预测结果">
                  <span v-if="props.row.isHavingBug===true">没有缺陷</span>
                  <span v-else>存在缺陷</span>
                </el-form-item>
                <el-form-item label="使用模型">
                  <span>{{ props.row.modelType }}</span>
                </el-form-item>
                <el-form-item label="模型介绍">
                  <span>{{ props.row.modelDesc }}</span>
                </el-form-item>
                <el-form-item label="模型准确率">
                  <span>{{ props.row.modelAccuracy }}</span>
                </el-form-item>
                <el-form-item label="预测耗时">
                  <span>{{ props.row.costTime }}</span>
                </el-form-item>
                <el-form-item label="预测完成时间">
                  <span>{{ props.row.finishTime }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
              type="index"
              label="序号"
              width="180"
              :index="indexMethod">
          </el-table-column>
          <el-table-column
              prop="isHavingBug"
              label="预测结果"
              width="220">
            <template scope="scope">
              <el-tag v-if="scope.row.isHavingBug===false" type="danger">存在缺陷</el-tag>
              <el-tag v-else type="success">没有缺陷</el-tag>
            </template>
          </el-table-column>
          <el-table-column
              prop="finishTime"
              label="预测完成时间"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-divider style="height: 1px"></el-divider>
    <div style="margin: 10px 0 10px 0">

      <el-button @click="prev"
                 :disabled="this.active>=2">
        上一步
      </el-button>

      <el-button v-show="active<2"
                 @click="next"
                 type="primary"
      >
        下一步
      </el-button>
      <el-button v-show="active===2"
                 :disabled="!this.isProcessFinished"
                 @click="next"
                 type="primary">下一步
      </el-button>
      <el-button v-show="active===3"
                 @click="returnFirstStep"
                 type="primary"
      >
        完成
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PredictPage",
  data() {
    return {
      //当前步骤
      active: 0,
      //弹窗是否显示
      dialogVisible: false,
      //数据是否是处理完成
      isProcessFinished: false,
      //文件上传附带的参数
      uploadData: null,
      //是否已上传文件
      isSend: false,
      //进度条的进度
      progress: 0,
      //进度条的状态
      status: 'warning',
      //当前用户的邮箱
      email: '',
      //当前vip等级
      vipLevel: 0,
      //是否存在bug
      isHavingBug: false,
      //处理是否结束
      isFinished: false,
      length: 0,
      tableData: [{
        numbering: '891222211',
        isHavingBug: "存在缺陷",
        modelType: '模型1',
        modelDesc: '模型1的描述',
        modelAccuracy: '0.9',
        costTime: '1s',
        finishTime: '2019-01-01 12:00:00'
      }, {
        numbering: '891222211',
        isHavingBug: "没有缺陷",
        modelType: '模型1',
        modelDesc: '模型1的描述',
        modelAccuracy: '0.9',
        costTime: '1s',
        finishTime: '2019-01-01 12:00:00'
      }, {
        numbering: '891222211',
        isHavingBug: "存在缺陷",
        modelType: '模型1',
        modelDesc: '模型1的描述',
        modelAccuracy: '0.9',
        costTime: '1s',
        finishTime: '2019-01-01 12:00:00'
      }]
    }
  },
  created() {
    this.request.post('/getVipLevel', {
      email: sessionStorage.getItem("email"),
    }).then(res => {
      if (res.code === 200) {
        this.vipLevel = res.level;
      } else {
        this.$message.error('获取用户等级失败');
      }
    })
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },

    //上传成功后提示成功
    uploadFileSuccess(response) {
      console.log(response);
      this.isSend = true;
      this.$message({
        message: '上传成功',
        type: 'success'
      });
    },
    //下载模板文件
    downloadTemplate() {
      // eslint-disable-next-line no-unused-vars
      this.request.post('/getFile').then(res => {
        this.$message({
          message: '下载成功',
          type: 'success'
        });
      }).catch(err => {
        console.log(err);
      })
      this.next();
    },
    //上传文件前的钩子,添加上传文件的参数
    beforeUpload() {
      this.uploadData = {email: sessionStorage.getItem("email")};
      return new Promise((resolve) => {
        this.$nextTick(function () {
          resolve(true);
        });
      }); //通过返回一个promis对象解决
    },

    //数据处理进度
    dataProcess() {
      this.reset();
      //TODO:此处获取用户的email，作为参数传给后端，从后端获取用户的等级，来提高效率
      let processSpeed = 1000;
      if (this.vipLevel > 0) {
        processSpeed = 300;
      }
      //  设置动态进度条
      //每秒随机增加进度条的进度，10s内到达100%
      //当isFinished为true时，将时间间隔缩短至100ms
      let timer = setInterval(() => {
        this.progress += Math.floor(Math.random() * 10 + 1);
        if (this.isFinished) {
          clearInterval(timer);
          processSpeed = 200;
          setInterval(() => {
            this.progress += Math.floor(Math.random() * 10 + 1);
            if (this.progress > 100) {
              this.progress = 100;
              this.isProcessFinished = true;
              this.status = 'success';
              clearInterval(timer);
            }
          }, processSpeed);
        }
        if (this.progress > 100) {
          this.progress = 100;
          this.status = 'success';
          this.isProcessFinished = true;
        }
      }, processSpeed);
      timer
    },
    reset() {
      //将预测信息参数重置
      this.progress = 0;
      this.isProcessFinished = false;
      this.status = 'warning';
      this.isFinished = false;

    },
    //下一步
    next() {
      if (this.active === 1) {
        this.reset();
        if (this.isSend === false) {
          this.$message({
            message: '请先上传文件',
            type: 'warning'
          });
          return;
        }
      }

      if (++this.active > 3) {
        this.active = 3;
        this.reset();
      }

      if (this.active === 2) {
        this.reset();
        this.dataProcess();
        this.request.post('/forecast', {
          email: sessionStorage.getItem("email"),
          v_level: this.vipLevel
        }).then(res => {
          this.tableData = res.result;
          this.isFinished = true;
        }).catch(err => {
          console.log(err);
        })
      }
    },

    prev() {
      this.reset();
      if (--this.active < 0) this.active = 0;
    },

    //预测结果展示完成后，用户返回初始步骤
    returnFirstStep() {
      this.progress = 0;
      this.isProcessFinished = false;
      this.status = 'warning';
      this.isFinished = false;
      this.active = 0;
      this.isSend = false;
    },
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

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}


</style>