/**
* @Author 王宇轩
* @Date 2022年09月18日 19:02
* @Description
*/

<template>
  <div>
    <el-dialog
        title="修改个人信息"
        :visible.sync="dialogVisible"
        width="60%"
        center
        height="100%"
        :append-to-body="true"
        :before-close="handleClose">
      <el-form :model="form" :rules="rules" ref="form" label-width="150px">
        <div class="updateinfo">
          <div style="flex: auto">
            <el-form-item label="头像" prop="avatar" style="text-align: center">
              <el-upload
                  class="avatar-uploader"
                  action="/api/uploadIcon"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :data="uploadData"
                  :before-upload="beforeAvatarUpload">
                <el-image
                    title="点击修改头像" style="width:150px;height:100px"
                    :src=this.form.avatar>
                </el-image>
                <!--                -->
                <!--                <img title="点击修改头像" style="width:150px;height:100px" src={{this.form.avatar}} alt="">-->
              </el-upload>
            </el-form-item>
            <el-form-item label="个性签名" prop="design">
              <el-input v-model="form.design"></el-input>
            </el-form-item>

          </div>
          <div class="left">
            <el-form-item label="邮箱" prop="email">
              <el-input disabled v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input v-model="form.nickname"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-switch
                  v-model="form.sex"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="男"
                  inactive-text="女"
                  :active-value="1"
                  :inactive-value="0"
              >
              </el-switch>
            </el-form-item>


          </div>

          <div class="right">

            <el-form-item label="手机号码" prop="mobilePhoneNumber">
              <el-input v-model="form.mobilePhoneNumber"></el-input>
            </el-form-item>

            <el-form-item label="注册日期" prop="createDate">
              <el-input disabled v-model="form.createDate"></el-input>
            </el-form-item>
            <el-form-item label="地区" prop="area">
              <el-input v-model="form.area"></el-input>
            </el-form-item>

          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="submit">提 交</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

// export function getIcon(params) {
//   return this.request({
//     url: 'http://localhost:9090/getIcon',
//     method: 'post',
//     responseType: 'arraybuffer',
//     params
//   })
// }
export default {
  name: "PersonalDia",
  data() {
    return {
      uploadData: null,
      dialogVisible: false,
      form: {
        avatar: '',
        email: '',
        mobilePhoneNumber: '',
        area: '',
        createDate: '',
        nickname: '',
        sex: 0,
        design: '',
      },
      rules: {
        nickname: [
          {required: true, message: "昵称不能为空", trigger: "blur"},
        ],
        email: [
          {required: true, message: "邮箱不能为空", trigger: "blur"},
        ],
      },
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.avatar = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload() {
      this.uploadData = {username: this.form.nickname};
      console.log(this.uploadData)
      return new Promise((resolve) => {
        this.$nextTick(function () {
          resolve(true);
        });
      }); //通过返回一个promis对象解决

      //判断上传的文件是否是图片
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;
      //
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
    },
    //打开修改个人信息对话框
    open() {
      this.email = sessionStorage.getItem('email');
      this.request.post('/getPersonInfo', {email: this.email}).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.form.email = res.email
          this.form.mobilePhoneNumber = res.mobilePhoneNumber
          this.form.area = res.area
          this.form.createDate = res.createDate
          this.form.nickname = res.nickname
          this.form.sex = res.sex
          this.form.design = res.design

          //  获取用户头像
          this.form.avatar = 'http://localhost:9090/getIcon?username=' + this.form.nickname

          // getIcon({ 'username': res.nickname }).then(function(response) {
          //   // 将后台的图片二进制流传华为base64
          //   return 'data:image/png;base64,' + btoa(
          //       new Uint8Array(response).reduce((data, byte) => data + String.fromCharCode(byte), '')
          //   )
          // }).then(data => {
          //   this.form.avatar = data // data即为图片地址
          // })

        } else {
          this.$message.error("信息拉取失败PersonalDia")
        }
      }).catch(() => {
        this.$message({
          message: '网络错误PersonalDia',
          type: 'error'
        });
      })
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
      // //发送信号，更新修改后的显示数据
      // this.$emit("flesh");
    },
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.request.post('/updatePersonInfo', this.form).then(res => {
            if (res.code === 200) {
              this.$message.success("修改成功")
              this.dialogVisible = false;
              //  刷新当前页面
              window.location.reload();
            } else {
              this.$message.error("修改失败")
            }
          }).catch(() => {
            this.$message({
              message: '网络错误submit',
              type: 'error'
            });
          })
        } else {
          this.$message.error("请检查输入")
        }
      });
    }
  }
  ,
}
;
</script>

<style scoped>
.updateinfo {
  height: 390px;
  overflow: auto;
}

.left {
  /*width: 330px;*/
  float: left;
}

.right {
  overflow: hidden;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
