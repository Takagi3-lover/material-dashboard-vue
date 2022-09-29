/**
* @Author 王宇轩
* @Date 2022年09月16日 18:57
* @Description 找回密码界面，从登陆界面跳转进来
*/
<template>
  <div class="wrapper">
    <div class="login_box">
      <div style="margin: 20px 0; text-align: center; font-size: 24px"><b style="font-size: 20px">{{ title }}</b></div>

      <el-form class="login_form" :model="user" :rules="findPswRules" ref="userForm">
        <div v-show="active===0">
          <el-form-item prop="email">
            <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-user" v-model="user.email"
                      placeholder="邮箱"></el-input>
          </el-form-item>

          <el-form-item prop="code">
            <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" v-model="user.code"
                      placeholder="验证码">
              <!--            发送验证码的按钮，位置靠右-->
              <el-button slot="append" :disabled="ifSend" type="primary" @click="sendCode">{{ statusMsg }}</el-button>
            </el-input>
          </el-form-item>

          <!--        按钮组件-->
          <el-form-item style="margin: 10px 0;text-align: center;">
            <!-- 包含登陆、注册、找回密码三个功能按钮，样式要美观-->
            <el-button type="success" @click="next">下一步</el-button>
            <el-button type="warning" @click="resetText">重置</el-button>
          </el-form-item>
        </div>
        <div v-show="active===1">
          <el-form-item prop="password">
            <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                      v-model="user.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                      v-model="user.confirmPassword" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item style="margin: 10px 0;text-align: center;">
            <el-button type="success" @click="prev">上一步</el-button>
            <el-button type="warning" @click="next">下一步</el-button>
          </el-form-item>
        </div>
        <div v-show="active===2">
          <el-form-item style="margin: 10px 0;text-align: center;">
            <div style="font-size: 16px;margin: 10px">-^0^-新密码重置成功，请重新登录！</div>
            <el-button type="primary" @click="$router.push('/login')"
                       style="margin: 10px">返回登录
            </el-button>
          </el-form-item>

        </div>

      </el-form>

    </div>

  </div>
</template>

<script>
export default {
  name: "FindPassword",
  data() {
    return {
      //当前所属的步骤
      active: 0,
      statusMsg: '发送验证码',
      ifSend: false,//是否发送验证码
      title: '身份验证',
      //存储找回密码可能用到的信息，包括邮箱，电话，密码，验证码等
      user: {
        email: '',
        phone: '',
        code: '',
        password: '',
        confirmPassword: '',

      },
      findPswRules: {
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur'},
          {pattern: /^[a-zA-Z\d@.]{10,20}$/, message: '邮箱只能包含字母、数字、@和.', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'},
          //  密码必须同时包含数字、大小写字母，长度在6到20个字符
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,20}$/,
            message: '密码必须同时包含数字,大、小写字母，长度在6到20个字符',
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          {required: true, message: '请再次输入密码', trigger: 'blur'},
          {
            validator: (rule, value, callback) => {
              if (value !== this.user.password) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
      }
    }
  },
  methods: {
    //重置表单
    resetText() {
      this.$refs.userForm.resetFields();
    },
    //【邮箱】-->【点击获取邮箱验证码】（校验邮箱格式是否正确；若正确，则后端判断该邮箱是否已注册。
    // 只有已注册的邮箱，系统才会发送邮箱验证码，否则显示错误信息）-->【前往邮箱，查收验证码并输入】-->【点击下一步】
    // (向后端提交邮箱和验证码，后端判断是否匹配，若匹配则身份验证成功，进入重置密码页面，否则显示错误信息)
    //发送验证码
    sendCode() {
      let ifCountStart = false;
      //校验邮箱格式是否正确，若正确，则后端判断该邮箱是否已注册
      this.$refs.userForm.validateField('email', (errorMsg) => {
        if (!errorMsg) {
          //向后端发送请求，发送验证码
          this.request.post('/sendCode', this.user).then(res => {
            if (res.data.code === 200) {
              this.$message({
                message: '验证码发送成功，请前往邮箱查收',
                type: 'success'
              });
              this.ifSend = true;
              ifCountStart = true;
            } else {
              this.$message({
                message: res.data.msg,
                type: 'error'
              });
            }
          })
        } else {
          this.$message({
            message: '邮箱格式不正确',
            type: 'error'
          });
        }
      })

      //  若成功发送验证码，则开始倒计时，一分钟后可以再次发送
      if (ifCountStart) {
        let count = 60;
        let timer = setInterval(() => {
          if (count > 0 && count <= 60) {
            count--;
            this.statusMsg = count + '秒';
          } else {
            clearInterval(timer);
            this.statusMsg = '发送验证码';
          }
        }, 1000)
      }
    },
    //下一步
    next() {
      //如果当前处在步骤第一步，则在进入下一步骤之前，先校验邮箱和验证码是否正确
      if (this.active === 0) {
        this.$refs.userForm.validate((errorMsg) => {
          if (!errorMsg) {
            //向后端提交邮箱和验证码，后端判断是否匹配，若匹配则身份验证成功，进入重置密码页面，否则显示错误信息
            this.request.post('/verifyCode', this.user).then(res => {
              if (res.code === 200) {
                this.active++;
              } else {
                this.$message({
                  message: res.msg,
                  type: 'error'
                });
              }
            })
          } else {
            this.$message({
              message: '请填写正确的邮箱和验证码',
              type: 'error'
            });
          }
        })
      } else if (this.active === 1) {
        //如果当前处在步骤第二步，则在进入下一步骤之前，先校验密码格式是否正确
        this.$refs.userForm.validate((errorMsg) => {
          if (!errorMsg) {
            //向后端提交密码，后端判断是否匹配，若匹配则重置密码成功，否则显示错误信息
            this.request.post('findPassword', this.user).then(res => {
              if (res.code === 200) {
                this.active++;
              } else {
                this.$message({
                  message: res.msg,
                  type: 'error'
                });
              }
            })
          } else {
            this.$message({
              message: '请填写正确的密码',
              type: 'error'
            });
          }
        })
      } else {
        this.active++;
      }
      if (this.active === 0) {
        this.ifSend = false;
        this.title = '身份验证';
      } else if (this.active === 1) {
        this.title = '重置密码';
      } else {
        this.title = '重置成功';
      }
    },
    //上一步
    prev() {
      this.active--;
      if (this.active === 0) {
        this.ifSend = false;
        this.title = '身份验证';
      } else if (this.active === 1) {
        this.title = '重置密码';
      } else {
        this.title = '重置成功';
      }
    },
  }
}
</script>

<style scoped>
.wrapper {
  height: 100vh;
  /*background-image: linear-gradient(180deg, #2af598 0%, #009efd 100%);*/
  overflow: hidden;
  /*  铺满整个界面*/
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("@/assets/img/bg4.jpg");
  background-size: 100% 100%;
}

.login_box {
  width: 400px;
  height: 300px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #d3d3d3;
  box-shadow: 0 36px 54px -12px rgb(0 0 0);
  background-color: rgba(255, 255, 255, 0.7);
}

.login_form {
  margin-top: 20px;
  padding: 0 25px;
}
</style>