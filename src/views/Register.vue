/**
* @Author 王宇轩
* @Date 2022年09月16日 18:57
* @Description 用户注册界面 从属于Login.vue
*/
<template>
  <div class="wrapper">
    <div class="login_box">
      <div style="margin: 20px 0; text-align: center; font-size: 24px"><b style="font-size: 20px">注册</b></div>

      <!--      注册表单，包含输入邮箱、验证码、密码、确认密码文本框和注册、取消两个按钮,验证码输入框后有发送验证码的功能-->
      <el-form class="login_form" :model="register" :rules="registerRules" ref="registerForm">
        <el-form-item prop="email" style="margin: 0">
          <el-input size="medium" style="margin: 0" prefix-icon="el-icon-message" v-model="register.email"
                    placeholder="邮箱"></el-input>
          <!--          发送验证码按钮-->
          <el-button size="mini" style="margin: 0" round @click="sendCode">
            发送验证码
          </el-button>
          <span class="status">{{ statusMsg }}</span>

        </el-form-item>
        <el-form-item prop="code">
          <el-input size="medium" style="margin: 0" prefix-icon="el-icon-chat-line-square"
                    v-model="register.code" placeholder="验证码"></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input size="medium" style="margin: 0" prefix-icon="el-icon-user"
                    v-model="register.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                    v-model="register.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input size="medium" style="margin: 10px 0" prefix-icon="el-icon-lock" show-password
                    v-model="register.confirmPassword" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item style="margin: 10px 0;text-align: center;">
          <!-- 包含注册、取消两个按钮-->
          <el-button type="primary" @click="handleRegister">注册</el-button>
          <el-button type="success" @click="$router.push('/login')">取消</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>

<script>

export default {
  //禁用eslint
  /* eslint-disable */
  name: 'Register',
  data() {
    return {
      //验证码状态信息
      statusMsg: '',

      //注册表单,包含邮箱、验证码、密码、确认密码
      register: {
        username: '',
        password: '',
        email: '',
        confirmPassword: '',
        code: ''
      },
      registerRules: {
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur'},
          {pattern: /^[a-zA-Z\d@.]{10,20}$/, message: '邮箱只能包含字母、数字、@和.', trigger: 'blur'},
          {
            type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']
          }
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
              if (value !== this.register.password) {
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
    handleRegister() {
      //  TODO: 注册 1.校验表单 2.发送请求
      this.$refs.registerForm.validate((errorMsg) => {
        console.log(errorMsg)
        if (errorMsg) {
          //  校验通过
          this.request.post('/register', this.register).then(res => {
            if (res.code=== 200) {
              //  注册成功
              this.$message.success('注册成功');
              this.$router.push('/login');
            } else {
              //  注册失败
              this.$message.error(res.msg);
            }
          }).catch(err => {
            //  注册失败
            this.$message({
              message: '注册失败',
              type: 'error'
            });
          })
        } else {
          //  校验失败
          this.$message({
            message: '校验失败',
            type: 'error'
          });
        }
      })

    },
    //发送验证码
    sendCode() {
      let ifCountStart = false;
      this.$refs['registerForm'].validateField('email', (errorMsg) => {
        if (!errorMsg) {
          this.request.post('/sendCode',
              {
                mail: this.register.email
              }
          ).then(res => {
            if (res === 200) {
              ifCountStart = true;
            } else {
              this.statusMsg = '验证码发送失败'
            }
          })
        } else {
          this.statusMsg = '邮箱格式错误'
        }
      })

      //  若成功发送验证码，则开始倒计时，两分钟后失效
      if (ifCountStart) {
        let count = 120;
        let timer = setInterval(() => {
          if (count > 0 && count <= 120) {
            count--;
            this.statusMsg = '验证码已发送，剩余' + count + '秒';
          } else {
            clearInterval(timer);
            this.statusMsg = '';
          }
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>

.status {
  font-size: 12px;
  margin-left: 20px;
  color: #e6a23c;
}

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
  background: url("@/assets/img/bg3.jpg");
  background-size: 100% 100%;
}

.login_box {
  width: 400px;
  height: 500px;
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
